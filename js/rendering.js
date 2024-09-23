
export function startRendering(w, context, size, origin) {
  
  const start = performance.now()
  
  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      console.log("Starting new worker")
      w = new Worker("js/raycast_chapter5_worker.js" + `?size=${size}&ox=${origin.x}&oy=${origin.y}&oz=${origin.z}`)
    }

    w.onmessage = function(event) {
      const data = event.data
      const elapsed = Math.round(performance.now() - start) / 1000
      document.getElementById("out").innerHTML = "Rendering: " + event.data.done + "%" + " elapsed time: " + elapsed + " seconds"
      context.fillStyle = `rgb(${data.red}, ${data.green}, ${data.blue}`
      context.fillRect(data.x, data.y, 1, 1)
    }
  } else {
    document.getElementById("error").innerHTML = "Sorry! No Web Worker support."
  }
  
  return w
}

