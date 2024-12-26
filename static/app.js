let socket = null;
// Realtime orders via Websocket
const realtimeOrders = (category) => {
  if (socket === null) {
    socket = new WebSocket(`${WS_API}/orders/${category}`);
  } else {
    socket.send(
      // Send update-category command to server
      JSON.stringify({ cmd: "update-category", payload: { category } })
    );
  }
  // Listen for messages
  socket.addEventListener("message", ({ data }) => {
    try {
      const { id, total } = JSON.parse(data);
      const item = document.querySelector(`[data-id="${id}"]`);
      if (item === null) return;
      const span =
        item.querySelector('[slot="orders"]') || document.createElement("span");
      span.slot = "orders";
      span.textContent = total;
      item.appendChild(span);
    } catch (err) {
      console.error(err);
    }
  });
};