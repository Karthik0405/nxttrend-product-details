// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const statusList = {
  initial: 'INITAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgerss: 'IN_PROGRESS',
}

class ProductDetails extends Component {
  state = {
    searchedProduct: [],
    similarProductsList: [],
    statusIs: statusList.initial,
    count: 1,
  }

  componentDidMount() {
    this.gettingProductDeatails()
  }

  gettingProductDeatails = async () => {
    this.setState({
      statusIs: statusList.inProgerss,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = ` https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const searchedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        price: data.price,
        description: data.description,
      }
      const similarProducts = data.similar_products
      const updatedSimilarProducts = similarProducts.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        title: eachItem.title,
        style: eachItem.style,
        brand: eachItem.brand,
        price: eachItem.price,
        rating: eachItem.rating,
      }))
      this.setState({
        searchedProduct: searchedData,
        similarProductsList: updatedSimilarProducts,
        statusIs: statusList.success,
      })
    } else {
      this.setState({
        statusIs: statusList.failure,
      })
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  displaySearchedProduct = () => {
    const {searchedProduct, similarProductsList, count} = this.state
    const {
      imageUrl,
      title,
      brand,
      totalReviews,
      rating,
      availability,
      description,
      price,
    } = searchedProduct
    return (
      <div className="product-similar-continer">
        <div className="product-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product-description-container">
            <h1 className="product-title">{title}</h1>
            <p className="product-price">Rs {price}/-</p>
            <div className="rating-reviews-container">
              <div className="rating-container">
                <p className="rating-is">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="rating-image"
                />
              </div>
              <p className="total_reviews">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <p className="available-brand">
              <span className="span-available-brand">Available: </span>
              {availability}
            </p>
            <p className="available-brand">
              <span className="span-available-brand">Brand: </span>
              {brand}
            </p>
            <hr />
            <div className="purchase-button-container">
              <button
                className="increment-decrement-button"
                data-testid="minus"
                onClick={this.onDecrement}
              >
                <BsDashSquare />
              </button>
              <p className="how-many-purchase">{count}</p>
              <button
                className="increment-decrement-button"
                data-testid="plus"
                onClick={this.onIncrement}
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="cart-button">ADD TO CART</button>
          </div>
        </div>
        <div className="similar-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-product-list-container">
            {similarProductsList.map(eachItem => (
              <SimilarProductItem eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  continueShoppping = () => {
    const {history} = this.props
    history.push('/products')
  }

  displayLoader = () => (
    <div data-testid="loader" className="loader-class">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  displayFilureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-image"
      />
      <h1 className="error-msg">Product Not Found</h1>
      <button
        className="continue-Shopping"
        type="button"
        onClick={this.continueShoppping}
      >
        Continue Shopping
      </button>
    </div>
  )

  displayProducts = () => {
    const {statusIs} = this.state
    switch (statusIs) {
      case statusList.inProgerss:
        return this.displayLoader()
      case statusList.success:
        return this.displaySearchedProduct()
      case statusList.failure:
        return this.displayFilureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.displayProducts()}
      </div>
    )
  }
}
export default ProductDetails
