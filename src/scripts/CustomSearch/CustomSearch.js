/**
 * @module CustomSearch
 */

import ReactDOM from "react-dom";
import React, { useState } from "react";

import Result from "./components/Results";

import { FormContext } from "./FormContext";

const CustomSearch = {
  /**
   * @method addForm
   * @description Add g_form to the props that will be passed to StoreMap.
   * @param  {g_form} form Form used to get current record information
   * @return {Object}      `this`
   */
  addForm(form) {
    this.form = form;
    return this;
  },

  addScope(scope) {
    this.scope = scope;
    return this;
  },

  render() {
    ReactDOM.render(
      <FormContext.Provider value={{ form: this.form, scope: this.scope }}>
        <Result />
      </FormContext.Provider>,
      document.getElementById("customsearchroot")
    );
  }
};

window.CustomSearch = CustomSearch;
