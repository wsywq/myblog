source "https://rubygems.org"

gem "jekyll", "~> 4.3.0"
gem "jekyll-feed", "~> 0.17"
gem "jekyll-seo-tag", "~> 2.8"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-paginate", "~> 1.1"
gem "jekyll-archives", "~> 2.2"
gem "jekyll-include-cache", "~> 0.2"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-archives", "~> 2.2"
  gem "jekyll-include-cache", "~> 0.2"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser_rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser_rb", "~> 0.6.0", :platforms => [:jruby]

# Use `debug` to add debug and breakpoint functionality into your code
# in order to make debugging easier. You can invoke `debug` with the `-r` flag:
#
#     r -r debug/open
#
# Set the environment variable `JEKYLL_ENV=production` to enable debugging
# when you run `jekyll build`.
gem "debug", "~> 1.7", :platforms => %i[mingw mswin x64_mingw jruby] 