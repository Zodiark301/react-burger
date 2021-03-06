import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from "prop-types";
import PropTypesIngredientsData from '../../utils/propTypes';
import styles from './burgerConstructor.module.css'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../BurgerIngredients/ConstructorItem';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderContext from '../../services/orderContext';

const BurgerConstructor = ({ onClick }) => {

   const [totalPrice, setTotalPrice] = useState(0);

   const order = React.useContext(OrderContext);

   useEffect(() => {
      order.map((orderEl) => {
         if (orderEl.type !== 'bun') {
            setTotalPrice(totalPrice + orderEl.price)
         } else {
            setTotalPrice(totalPrice + orderEl.price * 2)
         }
      })
   }, [order])

   return (
      <section className={`${styles.burgerConstructor} pl-4`}>
         {order
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => {
               return (
                  <article
                     key={ingredient._id}
                     className={`${styles.burgerConstructor__cardBunElement} ml-8 mr-2 mt-25`}
                  >
                     <ConstructorItem ingredient={ingredient} type={"top"}> верх</ConstructorItem>
                  </article>
               );
            })}

         <div className={styles.burgerConstructor__wrapper}>
            <ul className={`${styles.burgerConstructor__list} pr-4`}>
               {
                  order.length > 1 &&
                  order.map((ingredient) => {
                     if (ingredient.price !== 0 && ingredient.type !== 'bun') {
                        return (
                           <li key={ingredient._id}>
                              <article className={styles.burgerConstructor__cardElement}>
                                 <p className={styles.burgerConstructor__dragIcon}>
                                    <DragIcon type="primary" />
                                 </p>
                                 <ConstructorItem isLocked={false} ingredient={ingredient} type={""} />
                              </article>
                           </li>
                        );
                     }
                  })
               }
            </ul>
         </div>


         {order
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => {
               return (
                  <article
                     key={ingredient._id}
                     className={`${styles.burgerConstructor__cardBunElement} ml-8 mr-2 mb-6`}
                  >
                     <ConstructorItem ingredient={ingredient} type={"bottom"}> низ</ConstructorItem>
                  </article>
               );
            })}

         <div className={`${styles.burgerConstructor__totalPriceContainer} mr-4`}>
            <div className={`${styles.burgerConstructor__totalPrice} pr-10`}>
               <p
                  className={`${styles.burgerConstructor__price} $text text_type_digits-medium`}
               ></p>
               <p className="text text_type_digits-medium">{totalPrice}</p>
               <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={onClick}>
               Оформить заказ
            </Button>
         </div>
      </section>
   );
};

BurgerConstructor.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
