import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

const { div, button, p, h1 } = hh(h);

const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

const MSGS = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};

function update(msg, model) {
  switch (msg) {
    case MSGS.INCREASE:
      return { ...model, count: model.count + 1 };
    case MSGS.DECREASE:
      return { ...model, count: model.count - 1 };
    default:
      return model;
  }
}

function view(dispatch, model) {
  return div({ className: "flex flex-col gap-4 items-center" }, [
    h1({ className: "text-4xl" }, `Count: ${model.count}`),
    div({ className: "flex gap-4" }, [
      button({ className: btnStyle, onclick: () => dispatch(MSGS.INCREASE) }, "+ Increase"),
      button({ className: btnStyle, onclick: () => dispatch(MSGS.DECREASE) }, "- Decrease"),
    ]),
    p({ className: "text-sm text-gray-500" }, "Counting stuff since 1291 🏰"),
  ]);
}

const initModel = {
  count: 0,
};

function app(initModel, update, view, node) {
  console.log("Starting app");
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);
