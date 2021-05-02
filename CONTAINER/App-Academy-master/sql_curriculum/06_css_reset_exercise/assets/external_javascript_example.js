window.onload = () => {
  (function reviewFormListener() {
    form = document.getElementById("review-form");
    form.addEventListener("submit", placeReview);
  })();
};

var placeReview = event => {
  event.preventDefault();
  const reviewElement = createReview(event);
  const reviewSection = document.getElementById('reviews');
  reviewSection.insertBefore(reviewElement, reviewSection.childNodes[2]);
};

var createReview = event => {
  const name = document.createTextNode(getName(event));
  const rating = document.createTextNode(getRating(event));
  const expertise = document.createTextNode(getExpertise(event));
  const review = document.createTextNode(getReview(event));

  const nameHeader = document.createElement('h4');
  const ratingParagraph = document.createElement('p');
  const expertiseParagraph = document.createElement('p');
  const reviewParagraph = document.createElement('p');

  nameHeader.appendChild(name);
  ratingParagraph.appendChild(rating);
  expertiseParagraph.appendChild(expertise);
  reviewParagraph.appendChild(review);

  const reviewElements = [nameHeader, ratingParagraph, expertiseParagraph, reviewParagraph];
  const reviewElement = document.createElement('div');
  reviewElements.forEach(el => {
    reviewElement.appendChild(el);
  });
  reviewElement.id = `${name.textContent}_review`;
  reviewElement.className = 'user_review';

  return reviewElement;
};

var getName = ({target}) => {
  return target.children.name.value;
};

var getRating = ({target}) => {
  let ratingScore;
  const formChildren = target.children;
  for (let i = 0; i < formChildren.length; i++) {
    if (formChildren[i].type === "radio" && formChildren[i].checked) {
      ratingScore = formChildren[i].value;
    }
  }

  return `Rating: ${ratingScore}`;
};

var getExpertise = ({target}) => {
  const dropdown = target.children.expertise;
  return `Expertise: ${dropdown.options[dropdown.selectedIndex].text}`;
};

var getReview = ({target}) => {
  let reviewText;
  const formChildren = target.children;
  for (let i = 0; i < formChildren.length; i++) {
    if (formChildren[i].tagName === "LABEL" && formChildren[i].children[0]) {
      reviewText = formChildren[i].children[0].value;
    }
  }

  return reviewText;
};
