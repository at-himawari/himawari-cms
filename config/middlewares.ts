// config/middlewares.ts
export default [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          // img-src と media-src に CloudFront と S3 のドメインを追加
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            // .envのCDN_URLを直接書くか、以下のように展開します
            process.env.CDN_URL
              ? process.env.CDN_URL.replace(/^https?:\/\//, "")
              : "",
            `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            process.env.CDN_URL
              ? process.env.CDN_URL.replace(/^https?:\/\//, "")
              : "",
            `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
