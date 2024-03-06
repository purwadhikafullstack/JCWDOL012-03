"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"

const AddToCartButton = ({ product }: { product: Product}) => {

  const { addItem } = useCart()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  
  // when the add to cart button is clicked, it will briefly show 'Added!' text
  useEffect(() => {
    const timeout = setTimeout(() => {
        setIsSuccess(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button onClick={() => {
        addItem(product)
        setIsSuccess(true)
    }} size='lg' className="w-full">
        {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  )
}

export default AddToCartButton