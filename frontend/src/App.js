import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checkedCredits, setCheckedCredits] = useState(false);
  
  const [updatedProduct, setUpdatedProduct] = useState({});


  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

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
  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));
  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  useEffect(() => {
    getAllProducts();
  }, [checked4], [checked5]);

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

 function handleUpdateProduct(e) {

    e.preventDefault();
    fetch("http://localhost:4000/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update product completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
      setChecked5(!checked5);
  }
  return (
  <div id="font">
  
  {/* nav bar */}
  <div class="topnav">
  <a class="active" href="#home">Home</a>
  <a href="">Products 
  <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked6}
                onChange={(e) => setChecked6(!checked6)}/></a>
  <a href="#contact">Credits <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checkedCredits}
                onChange={(e) => setCheckedCredits(!checkedCredits)} /></a>
  <a href="">Delete <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
              onChange={(e) => setChecked4(!checked4)} /> </a>
  <a href="">Update <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked5}
                onChange={(e) => setChecked5(!checked5)} /></a>
</div>
{/* Nav bar ended */}


    <div>
      <h1 class="center">Catalog of Products</h1>
    </div>
            
      <div class="center">
     
      </div>
  
      <div>
          {checked6 && (
            <div>
              <button  class="btn btn-primary" onClick={() => getAllProducts()}>Show All products</button>
      <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
      

      <h1 class="center">Show all available Products.</h1>
      <hr></hr>
      {viewer1 && <div>Products {showAllItems}</div>}
      <hr></hr>
      <h1 font="id">Show one Product by Id:</h1>
      {viewer2 && <div>Product: {showOneItem}</div>}
      <hr></hr>
            <h3 id="font">Add a new product :</h3>
          <form action="">
          <div class="form-group">
          <label>ID</label>
              <input type="number" class="form-control" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
            </div>
            <div class="form-group" >
            <label>Title</label>
              <input type="text" class="form-control" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
            </div>
            <div class="form-group">
            <label>Price</label>
              <input type="number" class="form-control" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
            </div>
            <div class="form-group">
            <label>Description</label>
              <input type="text"  class="form-control" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
            </div>
            <div class="form-group">
            <label>Category</label>
              <input type="text"  class="form-control" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
            </div>

            <div class="form-group">
            <label>Image</label>
              <input type="text" class="form-control" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
            </div>
            <div class="form-group">
            <label>Rate</label>
              <input type="number" class="form-control"  placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
            </div>
            <div class="form-group">
            <label>Count</label>
              <input type="number" class="form-control" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
            </div>
              <button className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2" type="submit" onClick={handleOnSubmit}>
                  submit
              </button>
          </form>
          </div>
          )}
          </div>
      <div>
          
          {checked4 && (
            <div>
            <h3>Delete one product:</h3>
          
            <button onClick={() => getOneByOneProductPrev()}>Prev</button>
            <button onClick={() => getOneByOneProductNext()}>Next</button>
            <button className="btn btn-dark btn-lg mx-3 px-5 py-3 mt-2" onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
            
              <div key={product[index]._id}>
                  <img src={product[index].image} width={30} /> <br />
                  Id:{product[index]._id} <br />
                  Title: {product[index].title} <br />
                  Category: {product[index].category} <br />
                  Price: {product[index].price} <br />
                  Rate :{product[index].rating.rate} and Count:
                  {product[index].rating.count} <br />
              </div>
              </div>
          )}
      </div>
      <div>
        
        {checked5 && (
          <div>
      <h3>update an item, click checkbox to open menu</h3>

          <h3 style={{ marginTop: '20px' }}>Edit an Item:</h3>
          <form key={updatedProduct._id} onSubmit={handleUpdateProduct}>
            <input type="text" name="_id" placeholder="ID" value={updatedProduct._id || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, _id: e.target.value })} style={{ width: '15%', height: '40px' }} />

            <input type="text" name="title" placeholder="title" value={updatedProduct.title || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })} style={{ width: '15%', height: '40px' }} />

            <input type="number" name="price" placeholder="price" value={updatedProduct.price || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} style={{ width: '15%', height: '40px' }} />

            <input type="text" name="description" placeholder="description" value={updatedProduct.description || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} style={{ width: '15%', height: '40px' }} />

            <input type="text" name="category" placeholder="category" value={updatedProduct.category || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })} style={{ width: '15%', height: '40px' }} />

            <input type="text" name="image" placeholder="image url" value={updatedProduct.image || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} style={{ width: '15%', height: '40px' }} />

            <input type="number" name="rate" placeholder="rating" value={updatedProduct.rating?.rate || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, rating: { ...updatedProduct.rating, rate: e.target.value } })} style={{ width: '15%', height: '40px' }} />

            <input type="number" name="count" placeholder="# of ratings" value={updatedProduct.rating?.count || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, rating: { ...updatedProduct.rating, count: e.target.value } })} style={{ width: '15%', height: '40px' }} />
            <button type="submit" onClick={handleUpdateProduct}>Update Item</button>
          </form>
        </div>
        )}
        </div>
        
        

        {checkedCredits && (
          <div>
          <h3>Credits, Click checkbox to show</h3>
        <p>
            Credits:
            <br></br>
            COMS319
            <br></br>
            05/06/2023
            <br></br>
            Jon Duron: jduron24@isu.edu
            <br></br>
            Will Griner: willyg@iastate.edu
            <br></br>
            Dr. Abraham N. Aldaco Gastelum
            <br></br>

          </p>
          </div>
        )}

  </div>
  );
}

export default App;
