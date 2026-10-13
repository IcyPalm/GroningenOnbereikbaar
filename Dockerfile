# Build the static site with Hugo, then serve it with nginx.
FROM ghcr.io/gohugoio/hugo:v0.167.0 AS build
USER root
WORKDIR /src
COPY site/ .
RUN hugo --gc --destination /out

FROM nginx:alpine

COPY --from=build /out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/healthz || exit 1
