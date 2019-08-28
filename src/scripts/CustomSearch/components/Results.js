import React, { Component, useContext, useEffect, useState } from "react";
import { FormContext } from "../FormContext";

import Ajax from "../../../../lib/Ajax";

const Result = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const { form, scope } = useContext(FormContext);

  async function setSearch() {
    const result = await Ajax("CustomSearch", "searchResults", {
      search: input
    });
    return result;
  }

  useEffect(() => {
    // No backend
    if (!scope && form && form.isNewRecord()) {
      form
        .getElement("short_description")
        .addEventListener("change", e => setInput(e.target.value));
    }
    // No portal
    if (scope && form) {
      scope.$watch(
        function() {
          return form.getValue("short_description");
        },
        function(value) {
          setInput(value);
        }
      );
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (input !== "") {
        const result = await setSearch();
        setResult(result);
      }
    })();
  }, [input]);

  return (
    <div class="container-fluid">
      <div class="list-group">
        {result &&
          result.map(e => {
            return (
              <a href={e.href} class="list-group-item" key={e.id}>
                <h4>{e.title}</h4>
                <p>{e.description}</p>
                <p>{e.author}</p>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Result;
