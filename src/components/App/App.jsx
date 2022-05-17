import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { apiConfig, parseResponse } from '../../constants/apiConfig';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

const App = () => {

   function getState() {
      fetch(`${apiConfig.url}`)
         .then(parseResponse)
         .then((json) => {
            setState(json.data);
         })
         .catch(er => console.log(er));
   }

   useEffect(() => {
      getState();
   }, []);

   const [state, setState] = useState([]);
   const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] = useState(false)
   const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false)
   const [currentIngredient, setCurrentIngredient] = useState({})

   const handleIngredientClick = (ingredient) => {
      setIsIngredientsDetailsOpened(true)
      setCurrentIngredient(ingredient)
   };

   const closeIngredientModal = () => {
      setIsIngredientsDetailsOpened(false)
   };

   const handleEscKeydownIngredientModal = (event) => {
      event.key === 'Escape' && closeIngredientModal()
   };

   const handleOrderClick = () => {
      setOrderDetailsOpened(true)
   }

   const closeOrderModal = () => {
      setOrderDetailsOpened(false)
   };

   const handleEscKeydownOrderModal = (event) => {
      event.key === 'Escape' && closeOrderModal()
   };

   return (

      <section className={styles.app}>

         <AppHeader />
         <main className={styles.app__flexComponents}>
            <BurgerIngredients ingredients={state} onIngredientClick={handleIngredientClick} />
            <BurgerConstructor ingredients={state} onOrderButtonClick={handleOrderClick} />
         </main>

         {isIngredientsDetailsOpened && (
            <Modal onCloseClick={closeIngredientModal} onEsckeyDown={handleEscKeydownIngredientModal}>
               <IngredientDetails ingredient={currentIngredient} />
            </Modal>
         )}

         {isOrderDetailsOpened && (
            <Modal onCloseClick={closeOrderModal} onEsckeyDown={handleEscKeydownOrderModal}>
               <OrderDetails />
            </Modal>
         )}

      </section>
   )

}

export default App;
