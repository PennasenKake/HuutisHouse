import React, { useState, useEffect } from 'react';
import axios from "axios"

function Myynti(){

  const [nimi, setNimi] = useState('')
  const [lahtohinta, setLahtohinta] = useState('')
  const [hintavaraus, setHintavaraus] = useState('')
  const [kuva, setKuva] = useState('')
    
    //tälle pitäisi koodata oikeat error ja response lauseet
    const axiosPostData = async () => {
      const formData = new FormData();
      formData.append('nimi', nimi);
      formData.append('lahtohinta', lahtohinta);
      formData.append('hintavaraus', hintavaraus);
      formData.append('kuva', kuva);
    
      try {
        const response = await axios.post('http://localhost:3001/myynti', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    
    
  //formi ajaa tämän submit painikkeen jälkeen
  const handleSubmit = (e) => {
    e.preventDefault()      
    axiosPostData()
    handleFetchData();
    
  }
  
  const productsData = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    { id: 4, name: 'Product 4', price: 40 },
  ];
  
  const Product = ({ nimi, lahtohinta }) => (
    <div className="product">
      <h3>{nimi}</h3>
      <p>Price: ${lahtohinta}</p>
    </div>
  );
  //const [products] = useState(productsData);

  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tuotteet');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // You can call fetchData from elsewhere in your component if needed
  const handleFetchData = () => {
    fetchData();
  };


  //myynti sivun html
  return (
    <>
    <h1>Laita uusi tuote myyntiin</h1>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">

      <label>
        Nimi:
        <input
          type="text"
          id="nimi"
          name="nimi"
          value={nimi}
          onChange={(e) => setNimi(e.target.value)}
        />
      </label>

      <label>
        Lähtöhinta:
        <input
          type="number"
          id="lahtohinta"
          name="lahtohinta"
          value={lahtohinta}
          onChange={(e) => setLahtohinta(e.target.value)}
        />
      </label>

      <label>
        Hintavaraus:
        <input
          type="number"
          id="hintavaraus"
          name="hintavaraus"
          value={hintavaraus}
          onChange={(e) => setHintavaraus(e.target.value)}
        />
      </label>

      <label>
        Kuva:
        <input
        type="file"
        accept="image/*"
        id="kuva"
        onChange={(e) => setKuva(e.target.files[0])}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
    <div className="app">
      <h1>myyntilista placeholderi</h1>
      <div className="product-list">
      {products.map(products => (
           <Product 
           key={products.id} 
           nimi={products.nimi} 
           lahtohinta={products.lahtohinta} 
           
         />
        ))}
      </div>
    </div>
    </>
  );
  
};

export default Myynti;