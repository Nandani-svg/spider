(function() {
const api = typeof browser !== 'undefined' ? browser : chrome;
let settings = {
enabled: true,
speed: 200,
variableSpeed: false,
size: 100,
variableSize: false,
numSpiders: 1,
variableNumSpiders: false,
waveDelay: 10,
variableWaveDelay: false,
enableLeftWeb: false,
enableRightWeb: false,
leftWebSize: 100,
rightWebSize: 100,
};

let spawnerTimeout;
let leftWeb, rightWeb;

function init() {
api.storage.sync.get(settings, function(items) {
settings = items;
if (settings.enabled) {
addSpiderWebs();
startSpiderSpawner();
}
});

api.storage.onChanged.addListener(function(changes, area) {
if (area === 'sync') {
for (let key in changes) {
settings[key] = changes[key].newValue;
}
if (settings.enabled) {
addSpiderWebs();
startSpiderSpawner();
} else {
removeSpiderWebs();
stopSpiderSpawner();
}
}
});
}

function startSpiderSpawner() {
if (spawnerTimeout) {
clearTimeout(spawnerTimeout);
}
spawnSpider();
}