import {useState, useEffect} from 'react';
import InputBase from "../../Inputs/base";
import {useMutation} from "@apollo/client";
import NEW_REVIEW_MUTATION from "../../../graphql/mutations/cart/newReview";
import ReactStars from "react-rating-stars-component";
import {useToasts} from "react-toast-notifications";
import ButtonsPrimary from "../../Buttons/primary";

export default function NewReview({open = false, product, handleClose}) {
    const [isOpen, setIsOpen] = useState(open);
    const [fields, setFields] = useState({
        name: "",
        title: "",
        review: "",
        rating: 0,
    });
    const {addToast} = useToasts();


    const [addReview, {data, loading, error}] = useMutation(NEW_REVIEW_MUTATION, {
        onCompleted: (newData) => {
            if (newData.addReviewToProduct) {
                addToast("Se ha publicado la reseña", {
                    appearance: 'success'
                });
                setFields({name: "", title: "", review: "", rating: 0});
                handleClose(false);
            } else {
                addToast("Ha ocurrido un error al registrar la reseña", {
                    appearance: 'error'
                });
            }
        },
        variables: {
            productId: product.id,
            review: fields.review,
            rating: fields.rating,
            name: fields.name,
            title: fields.title,
        }
    });

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fields.name.length > 0 && fields.title.length > 0 && fields.review.length > 0 && fields.rating > 0) {
            // alert("Valido");
            addReview()
        } else {
            console.log(fields)
            alert("Inv")
        }
    };

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
    };

    if (!isOpen) {
        return null
    }

    const handleChangeRating = (e) => {
        setFields({...fields, rating: e});
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full px-4 py-6 bg-gray-100 shadow-lg">
            <h3 className="mb-4 text-gray-700 font-medium uppercase">Escribe una reseña</h3>
            <div className="w-full space-y-6">
                <InputBase
                    onChange={handleChange}
                    id={"review_name"}
                    value={fields.name} name={"name"} placeholder={"Nombre"} label={"Tu nombre"}/>
                <InputBase
                    id={"review_title"}
                    onChange={handleChange}
                    value={fields.title} name={"title"} placeholder={"Título"} label={"Título"}/>
                <div className="w-full">
                    <label className="mb-2 w-full block text-sm text-gray-500">Calificación</label>
                    <ReactStars
                        className="flex w-full space-x-2 focus:outline-none"
                        edit={true}
                        onChange={handleChangeRating}
                        value={0}
                        count={5}
                        filledIcon={<img alt="svgImg"
                                         className="h-6"
                                         src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjYiIGhlaWdodD0iMjYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgaWQ9Im9yaWdpbmFsLWljb24iIGZpbGw9IiNmMWM0MGYiPjxwYXRoIGQ9Ik0xNjcuNTI5NDUsNjcuMDU4MjljLTAuNzQ5NCwtMi4zNzc0IC0yLjg0MjU1LC00LjEzNDYyIC01LjMyMzMyLC00LjQ5NjRsLTQ4LjU1NTg4LC03LjA1NDY5bC0yMS43MzI1OCwtNDQuMDA3ODFjLTIuMjIyMzUsLTQuNDk2MzkgLTkuNjEyOTgsLTQuNDk2MzkgLTExLjg2MTE3LDBsLTIxLjcwNjczLDQ0LjAwNzgxbC00OC41NTU4OSw3LjA1NDY5Yy0yLjQ4MDc3LDAuMzYxNzggLTQuNTczOTIsMi4wOTMxNSAtNS4zNDkxNiw0LjQ5NjRjLTAuNzc1MjQsMi40MDMyNCAtMC4xMjkyMSw1LjAzOTA2IDEuNjc5NjksNi43NzA0M2wzNS4xNDQyMywzNC4yNjU2M2wtOC4yOTUwNyw0OC4zNDkxNmMtMC40MTM0NiwyLjQ4MDc3IDAuNTk0MzUsNS4wMTMyMiAyLjYzNTgyLDYuNDg2MTdjMi4wNDE0NiwxLjQ3Mjk2IDQuNzI4OTYsMS42Nzk2OSA2Ljk1MTMyLDAuNDkwOTlsNDMuNDM5MywtMjIuODE3OTFsNDMuNDEzNDYsMjIuODE3OTFjMC45ODE5NywwLjUxNjgzIDIuMDQxNDcsMC43NDk0IDMuMTAwOTYsMC43NDk0YzEuMzY5NTksMCAyLjcxMzM0LC0wLjQxMzQ2IDMuODc2MjEsLTEuMjQwMzhjMi4wNDE0NiwtMS40OTg3OSAzLjA0OTI4LC00LjAwNTQgMi42MzU4MSwtNi40ODYxN2wtOC4yOTUwNywtNDguMzQ5MTZsMzUuMTQ0MjMsLTM0LjI2NTYzYzEuODA4ODksLTEuNzU3MjEgMi40MjkwOCwtNC4zNjcxOSAxLjY1Mzg1LC02Ljc3MDQzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>}
                        emptyIcon={<img
                            className="h-6"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB10lEQVRIic3WwYtNcRQH8M+8odhgMRZsvGIkL1loFmjqEZqFP8Ha2h/wBktLu4kVIaKmKQuhKGVBmc3MbKiJBbGQoTdMGq7FPc+9bu9xL++VU6ff7fy+3/M959f5/br8x3YhfKB2DEn40UEKPcoJPR6UyKEQeB+eRKzv9jCStzAZ3w/6LXIgEn/AJmyQdTXeT6F7kXQyFzsdsbtlEgx1idWwDaPYiT04iSXU8TFwG/FS2uFFzOE5XuAVvhcTr8dZTGMeK7LJynurS1GtHtiVyDWNM1g3hAncKSR4E9V1fAH38a2AG5bep0Z03/GtBdwErMVMrpJml8qrWlN2MjOh8bOya7GxhP3/ILJPNpG38iJ5sSsBaPu7y3hQOiwJbnYTyYtdDuAyDlcQGcen4N7Amj8RimI7SoiMBjYJ7nDZ6mpYDGKZ4WgGdjG4pa2Gz0HeXAI/EtgvKnRDelwJ3lbgvAvO9m6bvdrcHetCIT6G2+Fjhb35WBtVhDrguVh3Scf1CY6HP5W+FnvLCPUawU5Hy7iEE9Kzb+N87J3CETzDVbwucEvZrF8fya/SH5ItOcwIzkkHII+drSLUDtJqdFT/DbYemFXZq1LapnBdj/PuYY3gTFUR6rv9AAJSiX9ESl3rAAAAAElFTkSuQmCC"/>}
                    />
                </div>
                <div className="w-full">
                    <label className="mb-2 w-full block text-sm text-gray-500">Tu reseña</label>
                    <textarea
                        name={"review"}
                        onChange={handleChange}
                        rows={5}
                        placeholder={"Tu reseña..."}
                        className="appearance-none relative shadow-input z-0 resize-none px-3 uppercase font-medium text-sm py-3 w-full px-3 bg-white text-black font-normal focus:outline-none"></textarea>
                </div>
            </div>
            <div className="w-full mt-4 flex space-x-4 items-center">
                <div className="w-auto">
                    <ButtonsPrimary disabled={loading} loading={loading} text={"Publicar reseña"}/>
                </div>
                <div className="w-auto">
                    <span onClick={() => {
                        handleClose(false)
                    }}>
                        Cancelar
                    </span>
                </div>
            </div>
        </form>
    )
}