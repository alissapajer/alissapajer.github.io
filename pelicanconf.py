AUTHOR="Alissa Pajer"
THEME="theme/basic"
SITENAME="Alissa Pajer's Blog"
#FIRST_NAME='Alissa'
#LAST_NAME='Blog'
#SITEURL='https://alissapajer.github.io'
#SITEDESCRIPTION="this is a worb site"
TIMEZONE='America/New_York'
#PATH="posts/"
#OUTPUT_PATH="docs/"
ARTICLE_URL="posts/{slug}.html"
ARTICLE_SAVE_AS="posts/{slug}.html"
DISPLAY_CATEGORIES_ON_MENU=False
DEFAULT_CATEGORY='misc'
STATIC_PATHS=['images','extra']
EXTRA_PATH_METADATA={'extra/favicon.ico': {'path': 'favicon.ico'}}

PLUGIN_PATHS=['./render-math/pelican/plugins']
PLUGINS = ['render_math']

#PLUGINS=['page-hierarchy']

# https://github.com/akhayyat/pelican-page-hierarchy
#PAGE_URL = '{slug}/'
#PAGE_SAVE_AS = '{slug}/index.html'
#SLUGIFY_SOURCE = 'basename'

#PLUGINS=['pelican_katex']
#KATEX={'output': 'mathml',
#       'displayMode': 'true'}

# CSS_FILE = 'luney.css'
