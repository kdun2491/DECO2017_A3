// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fXVQZ":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4e5dac8afe405db7";
module.bundle.HMR_BUNDLE_ID = "46e72ed2b02335d1";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}]},["fXVQZ"], null, "parcelRequire60da")
// Task object
class Task {
    constructor(id, title, description, subtasks, dueDate, importance, duration, completion){
        this.id = id; // Task ID;
        this.title = title; // Task Title (string)
        this.description = description; // Task Description (string)
        this.subtasks = subtasks; // Task Subtasks
        this.dueDate = dueDate; // Task Due Date (date)
        this.importance = importance; // Task Importance (number percentage of 100)
        this.duration = duration; // Task Duration (number of minutes to fully complete task)
        this.completion = completion; // Task Completion (number percentage of full task completion)
    }
}
// Empty array to add new tasks to
var taskList = new Array();
// Form event that adds a new task to the task list, upon clicking the submit button
var form = document.getElementById("newTaskForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let title1 = form.elements.inputTitle.value;
    let description1 = form.elements.inputDescription.value;
    let subtasks1 = form.elements.inputSubtasks.value;
    let dueDate1 = form.elements.inputDueDate.value;
    let importance1 = form.elements.inputImportance.value;
    let duration1 = form.elements.inputDuration.value;
    let completion1 = form.elements.inputCompletion.value;
    addTask(title1, description1, subtasks1, dueDate1, importance1, duration1, completion1);
    saveTasks();
    // Updates the Task List element on the page
    updateTaskList();
    document.getElementById('floating').classList.toggle('hidden');
});
form.addEventListener("reset", function(event) {
    clearTasks();
    document.getElementById('floating').classList.toggle('hidden');
});
// The Task List element
var taskListElement = document.getElementById("taskList");
// Adds Task to taskList based on given paramaters
function addTask(title1, description1, subtasksString, dueDateString, importance1, duration1, completion1) {
    // Return if errors
    if (dueDateString == "") {
        console.log("Wrong date format.");
        return;
    }
    // Split subtasks into trimmed array
    let subtasksSplit = new Array(0);
    let subtasks1 = new Array(0);
    if (subtasksString != "") {
        subtasksSplit = subtasksString.split(",");
        for(let i = 0; i < subtasksSplit.length; i++)subtasks1[i] = new Array(subtasksSplit[i].trim(), false);
    }
    // Ensure proper Date format
    let dueDate1 = new Date;
    dueDate1.setFullYear(dueDateString.substr(0, 4));
    dueDate1.setMonth(dueDateString.substr(5, 2));
    dueDate1.setDate(dueDateString.substr(8, 2));
    dueDate1.setHours(dueDateString.substr(11, 2), dueDateString.substr(14, 2), 0);
    // Clamp Importance between 0 and 100, and round to nearest integer
    importance1 = Math.round(Math.max(0, Math.min(100, importance1)));
    // Ensure duration is positive
    duration1 = Math.max(0, duration1);
    // Create new Task object, and set the paramaters
    let task = new Task(Date.now().toString(), title1.toString(), description1.toString(), subtasks1, dueDate1, importance1, duration1, completion1);
    // Pushes new Task to Task List
    taskList.push(task);
}
// Delete a Task from Task List at a given index
function deleteTask(index) {
    if (index < taskList.length) taskList.splice(index, 1);
    saveTasks();
    updateTaskList();
}
// Clear entore task list
function clearTasks() {
    console.log("Cleared task list.");
    taskList = new Array();
    saveTasks();
    updateTaskList();
}
// Save task to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}
// Update Tasklist from localStorage
function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks'));
}
function highlightTask(id1) {
    let elements = document.getElementById('taskList').children;
    for(let i = 0; i < elements.length; i++)if (elements[i].dataset.id == id1) elements[i].classList.add('highlighted');
    else elements[i].classList.remove('highlighted');
    for(let i1 = 0; i1 < taskList.length; i1++)if (taskList[i1].id == id1) {
        console.log("Highlighted: " + id1);
        document.getElementById('highlightTitle').textContent = taskList[i1].title;
        document.getElementById('highlightDescription').textContent = taskList[i1].description;
        document.getElementById('highlightSubtasks').innerHTML = "";
        for(let j = 0; j < taskList[i1].subtasks.length; j++)document.getElementById('highlightSubtasks').innerHTML += "<li onclick='markSubtask(" + j + ")'><div class='dot'></div><div class='line'></div>" + taskList[i1].subtasks[j][0] + "<span" + (taskList[i1].subtasks[j][1] ? "" : " class='uncomplete'") + ">✔</span>" + "</li>";
    }
}
function markSubtask(subtask) {
    let elements = document.getElementById('taskList').children;
    let id1 = 0;
    for(let i = 0; i < elements.length; i++)if (elements[i].classList.contains('highlighted')) {
        for(let j = 0; j < taskList.length; j++)if (elements[i].dataset.id == taskList[j].id) {
            id1 = taskList[j].id;
            taskList[j].subtasks[subtask][1] = !taskList[j].subtasks[subtask][1];
        }
    }
    saveTasks();
    updateTaskList();
    highlightTask(id1);
}
// Update the Task List element on the page
function updateTaskList() {
    taskList = loadTasks();
    // Clear existing Task List
    taskListElement.innerHTML = "";
    // Hide or display Empty Task List messages
    let displays = document.getElementsByClassName("emptyTasks");
    for(let i = 0; i < displays.length; i++)if (taskList.length > 0) displays[i].style.display = "none";
    else displays[i].style.display = "block";
    // For each Task in Task List, add a new unordered list to the element
    for(let i1 = 0; i1 < taskList.length; i1++){
        // Subtask HTML string
        let subtaskString = "";
        for(let j = 0; j < taskList[i1].subtasks.length; j++)subtaskString += "<li>" + taskList[i1].subtasks[j] + "</li>";
        let rating = "";
        switch(Math.floor(taskList[i1].importance / 100 * 4)){
            case 0:
                rating = "'>";
                break;
            case 1:
                rating = " low'>!";
                break;
            case 2:
                rating = " medium'>!!";
                break;
            case 3:
                rating = " high'>!!!";
                break;
            case 4:
                rating = " high'>!!!";
                break;
        }
        let remainingHours = Math.floor(taskList[i1].duration / 100 * (100 - taskList[i1].completion) / 60);
        let remainingMinutes = Math.round(taskList[i1].duration / 100 * (100 - taskList[i1].completion) % 60);
        taskListElement.innerHTML += "\
    <li data-id=" + taskList[i1].id + " onclick='highlightTask(" + taskList[i1].id + ")'>\
    <div class='title'><h2>" + taskList[i1].title + "</h2></div>\
    <div class='rating" + rating + "</div>\
    <div class='span description" + (taskList[i1].description.length == 0 ? " hidden" : "") + "'>" + taskList[i1].description + "</div>\
    <div class='split remaining'>" + (remainingHours > 0 ? remainingHours + "h " : "") + (remainingHours > 0 && remainingMinutes == 0 ? "" : remainingMinutes + "min") + " remaining</div>\
    <div class='split date'>" + dateString(taskList[i1].dueDate) + "</div>\
    </li>";
    }
}
// Log each Task in taskList to console
function printTasks() {
    for(let i = 0; i < taskList.length; i++)console.log(taskList[i]);
}
// Converts date to readable string when adding to element
function dateString(date) {
    date = new Date(date);
    let str = "";
    let day = "";
    switch(date.getDay()){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }
    let month = "";
    switch(date.getMonth()){
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
    // str += day.substr(0, 3); // Day
    // str += " ";
    str += date.getDate(); // Date
    str += " ";
    // str += month; // Month
    if (date.getFullYear() != new Date().getFullYear()) {
        str += month.substr(0, 3); // Month
        str += " ";
        str += date.getFullYear().toString(); //.slice(-2); // Year
    } else str += month; // Month
    // str += ", ";
    // str += date.getHours() + ":" + (parseInt(date.getMinutes()) >= 10 ? date.getMinutes() : "0" + date.getMinutes());
    return str;
}
updateTaskList();
highlightTask(taskList[0].id);

//# sourceMappingURL=index.b02335d1.js.map
