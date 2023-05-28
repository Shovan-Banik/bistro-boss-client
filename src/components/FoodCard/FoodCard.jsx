
const FoodCard = ({item}) => {
    const{name,image,recipe,price}=item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-black text-white absolute right-0 mr-5 mt-5 px-5">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-start">
                    <button className="btn btn-outline bg-slate-100 border-0 border-orange-400 border-b-4 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;