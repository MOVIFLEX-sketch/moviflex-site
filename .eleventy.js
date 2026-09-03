module.exports = function (eleventyConfig) {
  // Copie telle quelle des fichiers statiques (CSS, JS, robots, sitemap)
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/common.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // Fichiers hérités à conserver strictement à l'identique, en dehors du
  // dossier src/ pour garantir qu'Eleventy ne les traite jamais comme des
  // templates (avis.html = formulaire actif lié à Brevo/Make, guide-moviflex.html
  // = accès direct encore potentiellement utilisé par d'anciens clients).
  eleventyConfig.addPassthroughCopy({ "legacy/avis.html": "avis.html" });
  eleventyConfig.addPassthroughCopy({ "legacy/guide-moviflex.html": "guide-moviflex.html" });

  // Collection des articles de blog, triée du plus récent au plus ancien
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.njk").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
