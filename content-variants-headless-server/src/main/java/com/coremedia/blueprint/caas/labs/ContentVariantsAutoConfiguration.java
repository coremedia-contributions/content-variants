package com.coremedia.blueprint.caas.labs;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.util.Arrays;

@AutoConfiguration
public class ContentVariantsAutoConfiguration {

  @Bean
  @Qualifier("graphqlSchemaResource")
  public Resource contentVariantsSchemaResource() throws IOException {
    PathMatchingResourcePatternResolver loader = new PathMatchingResourcePatternResolver();
    return Arrays.stream(loader.getResources("classpath*:content-variants-schema.graphql"))
            .findFirst()
            .orElseThrow(() -> new IOException("GraphQl schema resource 'content-variants-schema.graphql' not found."));
  }
}
