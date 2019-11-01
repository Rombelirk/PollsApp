global.XMLHttpRequest = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;
global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;

if (window.__FETCH_SUPPORT__) {
    window.__FETCH_SUPPORT__.blob = false
}
