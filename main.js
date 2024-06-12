const draggable = document.querySelectorAll("div[draggable='true']");
const containers = document.querySelectorAll(".container");

draggable.forEach((d) => {
  d.addEventListener("dragstart", () => d.classList.add("drag"));
  d.addEventListener("dragend", () => d.classList.remove("drag"));
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);

    container[afterElement == null ? "appendChild" : "insertBefore"](
      document.querySelector(".drag"),
      afterElement
    );
  });
});

function getDragAfterElement(container, y) {
  const _draggable = [
    ...container.querySelectorAll("div[draggable='true']:not(.drag)"),
  ];

  return _draggable.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      return offset < 0 && offset > closest.offset
        ? { offset, element: child }
        : closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
