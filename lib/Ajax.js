export default function Ajax(include, method, params = {}) {
  const ga = new GlideAjax(include);
  ga.addParam("sysparm_name", method);

  // Add other sys params
  Object.keys(params).forEach(key => {
    ga.addParam(`sysparm_${key}`, params[key]);
  });

  return new Promise((resolve, reject) => {
    ga.getXML(function(xml) {
      let data;
      try {
        data = JSON.parse(
          xml.responseXML.documentElement.getAttribute("answer")
        );
      } catch (e) {
        data = xml.responseXML.documentElement.getAttribute("answer");
      }
      resolve(data);
    });
  });
}
