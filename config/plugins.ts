import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
          },
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET"),
          },
        },
        rootPath: "posts/images",
        baseUrl: env("CDN_URL"),
      },
      actionOptions: {
        upload: {
          ACL: null, // ▼ これを追加（ACLを無効化）
        },
        uploadStream: {
          ACL: null, // ▼ これを追加（ACLを無効化）
        },
        delete: {},
      },
    },
  },
});

export default config;