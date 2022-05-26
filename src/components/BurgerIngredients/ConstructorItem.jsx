import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function ConstructorItem({ ingredient, type, isLocked = true, children }) {
   return (
      <ConstructorElement
         type={type}
         isLocked={isLocked}
         text={
            children !== undefined ? ingredient.name + children : ingredient.name
         }
         price={ingredient.price}
         thumbnail={ingredient.image}
      />
   );
}

ConstructorItem.propTypes = {
   ingredient: PropTypes.object,
   type: PropTypes.string,
   isLocked: PropTypes.bool,
   children: PropTypes.string
};

export default ConstructorItem;
