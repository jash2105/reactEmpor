import { useState, useEffect } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import {BiUserCircle} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './App.css';


function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [index, setIndex] = useState(0);
  const [view, setView] = useState("read");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState("");


  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });
  
  const showAllItems = product
  .filter((el) =>
    el.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((el) => (
    <div
      key={el._id}
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        maxWidth: '300px',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
      }}
    >
      <img
        src={el.image}
        alt={el.title}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          marginBottom: '10px',
          borderRadius: '5px',
        }}
      />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '20px',
          marginBottom: '5px',
          textAlign: 'center',
        }}
      >
        {el.title}
      </div>
      <div style={{ marginBottom: '5px', textAlign: 'center' }}>
        Category: {el.category}
      </div>
      <div style={{ marginBottom: '5px', textAlign: 'center' }}>
        Price: {el.price}
      </div>
      <div style={{ marginBottom: '5px', textAlign: 'center' }}>
        Rate: {el.rating.rate} ({el.rating.count} reviews)
      </div>
    </div>
  ));
  
  const showOneItem = oneProduct.map((el) => (
    <div
      key={el._id}
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        maxWidth: '300px',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
      }}
    >
      <img
        src={el.image}
        alt={el.title}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          marginBottom: '10px',
          borderRadius: '5px',
        }}
      />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '20px',
          marginBottom: '5px',
          textAlign: 'center',
        }}
      >
        {el.title}
      </div>
      <div style={{ marginBottom: '5px', textAlign: 'center' }}>
        Category: {el.category}
      </div>
      <div style={{ marginBottom: '5px', textAlign: 'center' }}>
        Price: {el.price}
      </div>
      <div style={{ marginBottom: '5px', textAlign: 'center' }}>
        Rate: {el.rating.rate} ({el.rating.count} reviews)
      </div>
    </div>
  ));
  
  


  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  useEffect(() => {
    getAllProducts();
    }, []);


  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }
  useEffect(() => {
    getAllProducts();
    }, [checked4]);
    
  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  function updatePrice(productId, newPrice) {
    console.log("Updating price for product ID:", productId);
    fetch("http://localhost:4000/updatePrice/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: productId, price: newPrice }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update a product price completed for product ID:", productId);
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked5(!checked5);
  }

  
    function toggleDescription(id) {
      var desc = document.getElementById(id + "-desc");
      if (desc.style.display === "none") {
        desc.style.display = "block";
      } else {
        desc.style.display = "none";
      }
    }
  
  
 
  return (
    <div>
<div style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
    <button class={view === 'HOME' ? 'active' : ''} onClick={() => setView('HOME')} style={{ color: '#343a40', textDecoration: 'none', fontWeight: 600, fontSize: '18px', marginRight: '50px', cursor: 'pointer', transition: 'all 0.3s ease-in-out' }} 
       onMouseOver={(e) => {
         e.target.style.transform = 'scale(1.1)';
         e.target.style.color = '#007bff';
       }}
       onMouseLeave={(e) => {
         e.target.style.transform = 'scale(1)';
         e.target.style.color = '#343a40';
       }}>Home</button>
    <button class={view === 'POST' ? 'active' : ''} onClick={() => setView('POST')} style={{ color: '#343a40', textDecoration: 'none', fontWeight: 600, fontSize: '18px', marginRight: '50px', cursor: 'pointer', transition: 'all 0.3s ease-in-out' }}
       onMouseOver={(e) => {
         e.target.style.transform = 'scale(1.1)';
         e.target.style.color = '#007bff';
       }}
       onMouseLeave={(e) => {
         e.target.style.transform = 'scale(1)';
         e.target.style.color = '#343a40';
       }}>Add</button>
       <button class={view === 'UPDATE' ? 'active' : ''} onClick={() => setView('UPDATE')} style={{ color: '#343a40', textDecoration: 'none', fontWeight: 600, fontSize: '18px', marginRight: '50px', cursor: 'pointer', transition: 'all 0.3s ease-in-out' }}
       onMouseOver={(e) => {
         e.target.style.transform = 'scale(1.1)';
         e.target.style.color = '#007bff';
       }}
       onMouseLeave={(e) => {
         e.target.style.transform = 'scale(1)';
         e.target.style.color = '#343a40';
       }}>Update</button>
    <button class={view === 'DELETE' ? 'active' : ''} onClick={() => setView('DELETE')} style={{ color: '#343a40', textDecoration: 'none', fontWeight: 600, fontSize: '18px', marginRight: '50px', cursor: 'pointer', transition: 'all 0.3s ease-in-out' }}
       onMouseOver={(e) => {
         e.target.style.transform = 'scale(1.1)';
         e.target.style.color = '#007bff';
       }}
       onMouseLeave={(e) => {
         e.target.style.transform = 'scale(1)';
         e.target.style.color = '#343a40';
       }}>Delete</button>
    
    <button class={view === 'ABOUT' ? 'active' : ''} onClick={() => setView('ABOUT')} style={{ color: '#343a40', textDecoration: 'none', fontWeight: 600, fontSize: '18px', marginRight: '50px', cursor: 'pointer', transition: 'all 0.3s ease-in-out' }}
       onMouseOver={(e) => {
         e.target.style.transform = 'scale(1.1)';
         e.target.style.color = '#007bff';
       }}
       onMouseLeave={(e) => {
         e.target.style.transform = 'scale(1)';
         e.target.style.color = '#343a40';
       }}>About Us</button>
       <button class={view === 'CART' ? 'active' : ''} onClick={() => setView('CART')} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '50px' }}>
  <i class="cart-icon" style={{ fontSize: '24px' }} onMouseOver={(e) => {
    e.target.style.transform = 'scale(1.1)';
    e.target.style.color = '#007bff';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.color = '#343a40';
  }}>
    <FaShoppingCart />
  </i>
</button>
<button class={view === 'LOGIN' ? 'active' : ''} onClick={() => setView('LOGIN')} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
  <i class="cart-icon" style={{ fontSize: '24px' }} onMouseOver={(e) => {
    e.target.style.transform = 'scale(1.1)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
  }}>
    <BiUserCircle/>
  </i>
</button>



       </div>
       </div>


       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: "20px", background: "#f2f9fb" }}>
  <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "10px", fontFamily: "'Roboto', sans-serif", background: "linear-gradient(to right, #4a91d4, #4ad4a3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
    LuxuryBagEmporium 
  </h1>
  <div
    className="p-4"
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      background: "#fff",
    }}
  >
  </div>
</div>




      {view === 'HOME' && (
      <div id="read-view">
        <button
          onClick={() => getAllProducts()}
          style={{
            background: view === 'READ' ? '#fff' : '#222',
            color: view === 'READ' ? '#222' : '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            outline: 'none',
          }}
          onMouseOver={(e) => {
            e.target.style.background = view === 'READ' ? '#222' : '#fff';
            e.target.style.color = view === 'READ' ? '#fff' : '#222';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = view === 'READ' ? '#fff' : '#222';
            e.target.style.color = view === 'READ' ? '#222' : '#fff';
          }}
        >
          Show All Products
        </button>

        <input
          type="text"
          id="message"
          name="message"
          placeholder="Enter Product ID"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginRight: '10px',
            maxWidth: '300px',
          }}
          onChange={(e) => getOneProduct(e.target.value)}
        />

<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ marginRight: '10px' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      width: '400px',
    }}
  />
</div>



        <h1>_________________________________________________________________________________________________________________</h1>
        <hr />
        {viewer1 && (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: '20px',
    padding: '20px',
  }}>
    {showAllItems}
  </div>
)}
<h1>Show one Product by Id:</h1>
      {viewer2 && 
  <div style={{
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <h3 style={{margin: '0'}}></h3>
    <div style={{marginLeft: '10px', fontSize: '1.2rem'}}>{showOneItem}</div>
  </div>
}

   </div> 
      )}
      <hr></hr>

      {view === 'POST' && (
    <div id="read-view2">
    <div >
    <div style={{textAlign: 'center'}}>
  <h3 className="login-heading">ADD A NEW PRODUCT</h3>
</div>
      <form action="" >
        <label htmlFor="_id" style={{display: 'block', marginBottom: '10px'}}>
          Product ID:
          <input type="number" placeholder="Enter ID" name="_id" value={addNewProduct._id} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <label htmlFor="title" style={{display: 'block', marginBottom: '10px'}}>
          Product Title:
          <input type="text" placeholder="Enter Title" name="title" value={addNewProduct.title} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <label htmlFor="price" style={{display: 'block', marginBottom: '10px'}}>
          Product Price:
          <input type="number" placeholder="Enter Price" name="price" value={addNewProduct.price} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <label htmlFor="description" style={{display: 'block', marginBottom: '10px'}}>
          Product Description:
          <input type="text" placeholder="Enter Description" name="description" value={addNewProduct.description} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <label htmlFor="category" style={{display: 'block', marginBottom: '10px'}}>
          Product Category:
          <input type="text" placeholder="Enter Category" name="category" value={addNewProduct.category} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <label htmlFor="image" style={{display: 'block', marginBottom: '10px'}}>
          Product Image:
          <input type="text" placeholder="Enter Image URL" name="image" value={addNewProduct.image} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <label htmlFor="rate" style={{display: 'block', marginBottom: '10px'}}>
          Product Rating:
          <input type="number" placeholder="Enter Rating" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <label htmlFor="count" style={{display: 'block', marginBottom: '20px'}}>
          Product Rating Count:
          <input type="number" placeholder="Enter Rating Count" name="count" value={addNewProduct.rating.count} onChange={handleChange} style={{marginLeft: '10px', padding: '5px'}} />
        </label>
        <button type="submit" onClick={handleOnSubmit} style={{
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }}> Submit</button> 
        </form>
        </div>
        </div>
      )}

{view === 'UPDATE' && (
    <div id="read-view" style={{ display: view === 'UPDATE' ? 'block' : 'none' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="update-container">
        <h3 className="update-heading">Update One Product Price:</h3>
        <div className="update-checkbox">
          <input
            type="checkbox"
            id="acceptupdate"
            name="acceptupdate"
            checked={checked5}
            onChange={() => setChecked5(!checked5)}
          />
          <label htmlFor="acceptupdate">Confirm Update</label>
        </div>
        <div className="update-buttons">
          <button className="prev-button" onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button className="next-button" onClick={() => getOneByOneProductNext()}>Next</button>
          <button className="update-price-button" onClick={() => updatePrice(product[index]._id, newPrice)}>Update Price</button>
        </div>
        {checked5 && (
          <div key={product[index]._id} className="product-details">
            <img className="product-image" src={product[index].image} alt="product" width={100} />
            <div className="product-info">
              <p className="product-id">Id: {product[index]._id}</p>
              <p className="product-title">Title: {product[index].title}</p>
              <p className="product-category">Category: {product[index].category}</p>
              <p className="product-price">Price: ${product[index].price.toFixed(2)}</p>
              <p className="product-rating">Rate: {product[index].rating.rate} and Count: {product[index].rating.count}</p>
              <label htmlFor="newPrice">New Price:</label>
              <input className="new-price-input" type="number" onChange={(e) => setNewPrice(e.target.value)} />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  
)}


      {view === 'DELETE' && (
  <div id="read-view">
    <div className="delete-product" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Delete Product:</h3>
      <div className="delete-product-options" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="acceptdelete" style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            id="acceptdelete"
            name="acceptdelete"
            checked={checked4}
            onChange={(e) => setChecked4(!checked4)}
          />
          <span>Confirm Delete</span>
        </label>
        <button onClick={() => getOneByOneProductPrev()} style={{ marginRight: '10px' }}>Prev</button>
        <button onClick={() => getOneByOneProductNext()} style={{ marginRight: '10px' }}>Next</button>
        <button
          style={{ backgroundColor: '#f44336', color: 'white', marginRight: '10px' }}
          onClick={() => deleteOneProduct(product[index]._id)}
          disabled={!checked4}
        >
          Delete
        </button>
      </div>
      {checked4 && (
        <div
          key={product[index]._id}
          className="delete-product-details"
          style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f7f7f7', padding: '10px', borderRadius: '5px' }}
        >
          <div className="product-image-container" style={{ marginRight: '20px' }}>
            <img
              src={product[index].image}
              alt="product"
              width={100}
            />
          </div>
          <div className="product-info-container">
            <h4 className="product-title">{product[index].title}</h4>
            <p className="product-id">ID: {product[index]._id}</p>
            <p className="product-category">
              Category: {product[index].category}
            </p>
            <p className="product-price">
              Price: ${product[index].price.toFixed(2)}
            </p>
            <p className="product-rating">
              Rate: {product[index].rating.rate} and Count:{' '}
              {product[index].rating.count}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
)}

     
{view === 'ABOUT' && (
 <div id="read-view" style={{textAlign: 'center', backgroundColor: 'linear-gradient(#FFA07A, #8ED6FF)'}}>

  <h2 style={{fontSize: '3rem', marginBottom: '2rem'}}>Team 71</h2>
  <h4 style={{fontSize: '2rem', marginBottom: '2rem'}}>SE/ComS319 Construction of User Interfaces, Spring 2023</h4>
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
    <div style={{margin: '1rem', padding: '1rem', backgroundColor: '#f2f2f2', borderRadius: '5px', minWidth: '300px', flex: 1}}>
      <h3 style={{marginBottom: '1rem'}}>RAGHURAM GUDDATI</h3>
      <button style={{padding: '0.75rem 1.25rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '1rem'}} onClick={() => toggleDescription('raghuram')}>View description</button>

      <p id="raghuram-desc" style={{fontSize: '1.2rem', lineHeight: '1.5', display: 'none'}}>
  <span style={{display: 'block'}}>Sophomore majoring in Software Engineering</span>
  <span style={{display: 'block'}}>Student of the course COMS 319</span>
  <span style={{display: 'block'}}>Professor : Abraham Netzahualcoy Aldaco Gastelum</span>
  <span style={{display: 'block'}}>E-mail : rguddati@iastate.edu</span>
</p>

    </div>
    <div style={{margin: '1rem', padding: '1rem', backgroundColor: '#f2f2f2', borderRadius: '5px', minWidth: '300px', flex: 1}}>
      <h3 style={{marginBottom: '1rem'}}>JASHWANTH K KUMAR</h3>
      <button style={{padding: '0.75rem 1.25rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '1rem'}} onClick={() => toggleDescription('jas')}>View description</button>

      <p id="jas-desc" style={{fontSize: '1.2rem', lineHeight: '1.5', display: 'none'}}>
  <span style={{display: 'block'}}>Sophomore majoring in Software Engineering</span>
  <span style={{display: 'block'}}>Student of the course COMS 319</span>
  <span style={{display: 'block'}}>Professor : Abraham Netzahualcoy Aldaco Gastelum</span>
  <span style={{display: 'block'}}>E-mail : jkumar@iastate.edu</span>
</p>    </div>
  </div>
  <div style={{margin: '2rem', padding: '2rem', backgroundColor: '#f2f2f2', borderRadius: '5px', maxWidth: '800px', margin: 'auto'}}>
    <h3 style={{marginBottom: '1rem'}}>Course Description (COMS 319)</h3>
    <p style={{fontSize: '1.2rem', lineHeight: '1.5'}}>
    <span style={{display: 'block'}}>User interface design overview. User interface evaluation and testing. In the context of user interface design, a review of object orientation principles, object-oriented design, and analysis using UML. design of commands, menus, and windows. creating Windows and Web-based user interfaces. programming that is event-driven. Frameworks and APIs for the creation of user interfaces are introduced.</span>
  <span style={{display: 'block'}}>Overall an very important and an excellent class.</span>
    </p>
  </div>
</div>
)}


{view === 'CART' && (
    <div id = "read-view">
      <h1>CART</h1>

      </div>
     )}



{view === 'LOGIN' && (
  <div id="read-view1" className="login-view">
    <div style={{textAlign: 'center'}}>
  <h3 className="login-heading">Login</h3>
</div>

    <form>
      <label htmlFor='email'>E-mail</label>
      <input type='email' id='email' name='email' />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' />
      <button type='submit' onClick={() => setView('HOME')}>Sign In</button>

      
    </form>
    <p className="signup-link">Don't have an account? <a href="#" onClick={() => setView('SIGNUP')}>Sign up</a></p>
  </div>
)}


{view === 'SIGNUP' && (
  <div id="read-view1" className="signup-view">
    <div style={{textAlign: 'center'}}>
  <h3 className="login-heading">Sign Up</h3>
</div>
    <form>
    <label htmlFor='fname'>First Name</label>
    <input type='fname' id='fname' name='fname' placeholder='Raghuram' />
    <label htmlFor='lname'>Last Name</label>
    <input type='lname' id='lname' name='lname' placeholder='Guddati' />
    <label htmlFor='email'>E-mail</label>
    <input type='email' id='email' name='email' placeholder='rguddati@iastate.edu' />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' />
      <label htmlFor='confirm-password'>Confirm Password</label>
      <input type='password' id='confirm-password' name='confirm-password' />
      <button type='submit' onClick={() => setView('LOGIN')}>Create Account</button>

    </form>
    <p>Already have an account? <a href="#" onClick={() => setView('LOGIN')}>Sign in</a></p>
  </div>
)}
    </div>
    
  );
} 
export default App;