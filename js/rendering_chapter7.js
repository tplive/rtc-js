
export function startRendering() {
  // This function starts a worker thread running the rendering process in the background.
  // Progress is sent back through the web worker onmessage() event.
  const start = performance.now()
  
  const config = arguments[0]
  let w = config.worker
  const context = config.context
  const vsize = config.vsize
  const hsize = config.hsize
  
  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      console.log("Starting new worker")
      w = new Worker("js/scene_chapter7_worker.js" + `?vsize=${vsize}&hsize=${hsize}`)
    }

    w.onmessage = function(event) {
      const data = event.data
      const elapsed = Math.round(performance.now() - start) / 1000
      document.getElementById("out").innerHTML = `${data.status}: ${data.percent} % Elapsed time: ${elapsed} seconds`
      
      context.fillStyle = `rgb(${data.red}, ${data.green}, ${data.blue})`
      context.fillRect(data.x, data.y, 1, 1)
    }
  } else {
    document.getElementById("error").innerHTML = "Sorry! No Web Worker support."
  }
  
  return w
}

