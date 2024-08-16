// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {eachItem} = props
  const {id, imageUrl, title, style, brand, price, rating} = eachItem
  return (
    <li className="similar-products-list">
      <img
        src={imageUrl}
        className="similar-products-image"
        alt="similar product"
      />
      <h1 className="similar-product-heading">{title}</h1>
      <p className="similar-product-brand ">by {brand}</p>
      <div className="similar-product-rating-price-container">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="similar-product-rating-container">
          <span className="similar-product-rating">{rating}</span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar-product-rating-image"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
