// Load the product data
import products from './data/products.json';

// Elements from store.html

const grid = document.getElementById('product-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const storeTitle = document.getElementById('store-title');
const filterNote = document.getElementById('filter-note');

// Season links on the home page add ?category=Winter (etc.) to the URL

const category = new URLSearchParams(window.location.search).get('category');
const shownProducts = category
  ? products.filter((product) => product.category === category)
  : products;

if (category) {
  storeTitle.textContent = `${category} colognes`;
  filterNote.hidden = false;
}

// Pagination settings

const PER_PAGE = 5;
const totalPages = Math.max(1, Math.ceil(shownProducts.length / PER_PAGE)); // 15 / 5 = 3
let currentPage = 1;

// Build one product card

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.src = product.imageUrl;
  img.alt = product.name;

  const title = document.createElement('h3');
  title.textContent = product.name;

  const badge = document.createElement('span');
  badge.className = 'category-badge';
  badge.textContent = product.category;

  const price = document.createElement('p');
  price.className = 'price';
  price.textContent = `$${product.price.toFixed(2)}`;

  const description = document.createElement('p');
  description.textContent = product.description;

  card.append(img, title, badge, price, description);
  return card;
}

// Show the products for the current page

function renderPage() {
  // Page 1 -> items 0-4, page 2 -> 5-9, page 3 -> 10-14

  const start = (currentPage - 1) * PER_PAGE;
  const pageProducts = shownProducts.slice(start, start + PER_PAGE);

  // Swap out the old cards for the new ones
  grid.replaceChildren(...pageProducts.map(createCard));

  // Update "Page X of Y"

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

  // Disable buttons at the edges
  prevBtn.disabled = currentPage === 1;

  nextBtn.disabled = currentPage === totalPages;
}

// Button clicks change the page, then re-render

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

// Show page 1 on load

renderPage();
