import fetch from 'node-fetch';
  import {
    ClientBuilder,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
  } from '@commercetools/sdk-client-v2';
  
  // Configure authMiddlewareOptions
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'rs-school-project',
    credentials: {
      clientId: "jG9r2DtAkOkoH7GuQfb4UqmW",
      clientSecret: "XIL28PFc2l-0_Um-9ANHNMF-uw-yafVe",
    },
    scopes: ['manage_my_quote_requests:rs-school-project view_project_settings:rs-school-project view_import_containers:rs-school-project view_customer_groups:rs-school-project view_states:rs-school-project manage_my_payments:rs-school-project view_quote_requests:rs-school-project manage_my_shopping_lists:rs-school-project manage_product_selections:rs-school-project manage_order_edits:rs-school-project view_audit_log:rs-school-project view_published_products:rs-school-project manage_my_orders:rs-school-project view_tax_categories:rs-school-project view_attribute_groups:rs-school-project view_cart_discounts:rs-school-project manage_my_business_units:rs-school-project manage_orders:rs-school-project view_connectors:rs-school-project view_shopping_lists:rs-school-project view_standalone_prices:rs-school-project manage_customers:rs-school-project view_quotes:rs-school-project manage_my_profile:rs-school-project view_connectors_deployments:rs-school-project view_products:rs-school-project view_categories:rs-school-project view_types:rs-school-project view_discount_codes:rs-school-project view_stores:rs-school-project view_shipping_methods:rs-school-project create_anonymous_token:rs-school-project view_business_units:rs-school-project view_messages:rs-school-project view_associate_roles:rs-school-project manage_payments:rs-school-project manage_my_quotes:rs-school-project view_staged_quotes:rs-school-project introspect_oauth_tokens:rs-school-project'],
    fetch,
  };
  
  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };
  
  // Export the ClientBuilder
  export const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();