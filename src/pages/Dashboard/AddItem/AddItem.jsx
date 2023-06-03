import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token=import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
    const[axiosSecure]=useAxiosSecure();
    const { register, handleSubmit,reset} = useForm();
    const img_hosting_url=`https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        const formData=new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url,{
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(imgResponse=>{
            if(imgResponse.success){
                const imgURL=imgResponse.data.display_url;
                const{name,price,category,recipe}=data;
                const newItem={name, price:parseFloat(price),category,recipe, image:imgURL};
                console.log(newItem);
                axiosSecure.post('/menu',newItem)
                .then(data=>{
                    console.log('after posting new item',data.data);
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Menu Item Added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
    };
    return (
        <div className="w-full md:w-2/3 md:mx-auto">
            <div>
                <SectionTitle subHeading="What's new" heading="Add an Item"></SectionTitle>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name" 
                    {...register("name", {required: true, maxLength: 120})} 
                    className="input input-bordered w-full" />
                </div>
                <div className="md:flex gap-5 my-3">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Deshi</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Drinks</option>
                            <option>Dessert</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" placeholder="Type here"
                        {...register("price", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details*</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Item Image*</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                </div>
                <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;