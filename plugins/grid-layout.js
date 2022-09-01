import VueGridLayout from "vue-grid-layout";
import Vue from "vue";

Vue.use(VueGridLayout)

function getElementsOrder(masonry) {
  let order = []
  masonry.forEach((element) => {
    order.push({
      sort: element.getAttribute("sort"),
      id: element.getAttribute("id"),
    });
  });

  return order
}

function masonryResponsive(columnWidth) {
    if (window.innerWidth <= 767) return Number(columnWidth * (window.innerWidth / 1000));
    if (window.innerWidth > 768 && window.innerWidth < 1439) return Number(columnWidth * (window.innerWidth / 1400));
    if (window.innerWidth >= 1440) return Number(columnWidth * (window.innerWidth / 1800));
}

function rearrangeColumns(columns) {
  columns.forEach((column, index) => {
    try {
      if (column.childNodes.length == 0) {
        let currentIndex = index;
        let found = false;
        let element = false;
        if (currentIndex == 0) {
          do {
            if (columns[index + 1].childNodes.length > 1) {
              found = index + 1;
              element =
                columns[found].childNodes[
                  columns[found].childNodes.length - 1
                ];
            }
            currentIndex++;
          } while (currentIndex < columns.length - 1);
  
          column.appendChild(element);
        } else {
          do {
            if (columns[index - 1].childNodes.length > 1) {
              found = index - 1;
              element =
                columns[found].childNodes[
                  columns[found].childNodes.length - 1
                ];
            }
            currentIndex--;
          } while (currentIndex > 0);
  
          column.appendChild(element);
        }
      }
    } catch {
    }
  });
}

function orderElements(order, oldOrder) {
  order.forEach((single, index) => {
    if (single.id !== oldOrder[index].id) {
      single.sort = oldOrder[index].sort;
    }
  });

  return order
}

function handleMasonryResize(columns, drake) {
  columns.forEach((column) => {
    drake.containers.push(column);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1024) {
      drake.containers = [];
    } else {
      columns = document.querySelectorAll(".masonry-column");
      drake.containers = [];
      columns.forEach((column) => {
        drake.containers.push(column);
      });
    }
  });
}

export default({}, inject) => {
  inject('getElementsOrder', getElementsOrder)
  inject('orderElements', orderElements)
  inject('rearrangeColumns', rearrangeColumns)
  inject("handleMasonryResize", handleMasonryResize);
  inject("masonryResponsive", masonryResponsive);
}
