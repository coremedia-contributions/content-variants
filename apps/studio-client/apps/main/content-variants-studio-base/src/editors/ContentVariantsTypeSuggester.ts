import SearchUtil from "@coremedia/studio-client.cap-base-models/util/SearchUtil";
import session from "@coremedia/studio-client.cap-rest-client/common/session";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import SearchParameters from "@coremedia/studio-client.cap-rest-client/content/search/SearchParameters";
import SearchResult from "@coremedia/studio-client.cap-rest-client/content/search/SearchResult";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import IdUtil from "@coremedia/studio-client.client-core/util/IdUtil";
import ILinkListWrapper from "@coremedia/studio-client.link-list-models/ILinkListWrapper";
import ILinkSuggester from "@coremedia/studio-client.link-list-models/ILinkSuggester";
import sitesService from "@coremedia/studio-client.multi-site-models/global/sitesService";
import { bind, mixin } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import int from "@jangaroo/runtime/int";
import { AnyFunction } from "@jangaroo/runtime/types";

interface SearchContentLinkSuggesterConfig extends Partial<Pick<SearchContentLinkSuggester,
  "contentValueExpression" |
  "linkTypeName" >> {
}

class SearchContentLinkSuggester implements ILinkSuggester {
  declare Config: SearchContentLinkSuggesterConfig;

  static readonly #PREFIX_SEARCH_MIN_CHARS: int = 3;

  /**
   * Optional ValueExpression that evaluates to a context content, typically the content the link list is defined in.
   * If set, the content is excluded from possible suggestions and links from the same site as this content are
   * returned first.
   */
  contentValueExpression: ValueExpression = null ;

  /**
   * If set, restricts suggestions to the given content type.
   */
  linkTypeName: string = null;

  constructor(config: Config<SearchContentLinkSuggester> = null) {
    this.contentValueExpression = config.contentValueExpression;
    this.linkTypeName = config.linkTypeName;
  }

  suggestLinks(linkListWrapper: ILinkListWrapper, searchTerm: string, callback: AnyFunction): void {
    linkListWrapper.getVE().loadValue((links: Array<any>): void => {
      this.suggestLinksInternal(links, null, searchTerm, callback);
    });
  }

  suggestLinksInternal(links: Array<any>, content: Content, searchTerm: string, callback: AnyFunction): void {
    const query = SearchContentLinkSuggester.buildQuery(searchTerm);
    const searchResultLimit: number = query === "" ? 5 : 20;

    ValueExpressionFactory
      .createFromFunction(bind(this, this.createSearchParameters), links, content, query, searchResultLimit)
      .loadValue((searchParameters: SearchParameters): void => {
        const connection = session._.getConnection();
        const searchService = connection.getContentRepository().getSearchService();
        const searchResult1 = searchService.search(searchParameters);
        searchResult1.load((result1: SearchResult): void => {
          const filtered1 = this.handleResult(result1, links, content, searchResultLimit);
          callback(filtered1);
        });
      });
  }

  createSearchParameters(links: Array<any>, content: Content, query: string, searchResultLimit: number): SearchParameters {
    const searchParameters = Object.setPrototypeOf({}, SearchParameters.prototype);

    // exclude deleted content
    const defaultFilterQuery = "(" + SearchUtil.buildQuery(true, true, true, true, true, false) + ")";
    searchParameters.filterQuery = [ defaultFilterQuery ];

    searchParameters.query = query;
    searchParameters.orderBy = ["freshness desc"];

    searchParameters.limit = SearchContentLinkSuggester.evaluateLimit(links, searchResultLimit, true);

    if (this.linkTypeName) {
      searchParameters.contentType = [ this.linkTypeName ];
    }

    const baseFolder = session._.getConnection().getContentRepository().getChild("/Settings/Options/Formats");
    if (baseFolder === undefined) {
      return undefined;
    }
    if (!baseFolder) {
      return searchParameters ;
    }

    const rootFolderId = IdUtil.parseContentId(baseFolder.getId());
    searchParameters.filterQuery = [ defaultFilterQuery, "folderpath:" + rootFolderId ];

    return searchParameters;
  }

  static siteRootFolder(content: Content): Content {
    const siteId = sitesService._.getSiteIdFor(content);
    if (siteId === undefined) {
      return undefined;
    }
    return sitesService._.getSiteRootFolder(siteId);
  }

  handleResult(result: SearchResult, excludeContents: Array<any>, excludeContent: Content, searchResultLimit: number): Array<any> {
    const hits = result.getHits();
    let excluded: Array<any> = excludeContents || [];
    if (excludeContent) {
      excluded = excluded.concat(excludeContent);
    }
    return hits.filter((hit: Content): boolean =>
      excluded.indexOf(hit) === -1,
    ).slice(0, searchResultLimit);
  }

  static evaluateLimit(links: Array<any>, wantedSuggestions: number, excludeContent: boolean): number {
    // raise the limit to be able to filter out unwanted links
    const currentLengthOfList: number = links.length;
    const limit: number = wantedSuggestions + currentLengthOfList;
    return excludeContent ? limit + 1 : limit;
  }

  static buildQuery(searchTerm: string): string {
    // do if prefix search unless the term ends with whitespace
    const doPrefixSearch: boolean = searchTerm.charAt(searchTerm.length - 1) !== " ";

    if (!doPrefixSearch) {
      return searchTerm;
    }

    if (searchTerm.length < SearchContentLinkSuggester.#PREFIX_SEARCH_MIN_CHARS) {
      // prefix search starts after some characters, short prefixes are expensive to check for the search engine
      return "";
    }

    return searchTerm + "*";
  }
}
mixin(SearchContentLinkSuggester, ILinkSuggester);

export default SearchContentLinkSuggester;
