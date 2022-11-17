import Image from "next/image";
import FutureImage from "next/future/image";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import Carousel from "@Components/Carousel";
import { useAuthState } from "@Lib/contexts/AuthContext";

export default function ProductGallery({
  productId,
  images,
  dimensions,
}: PropTypes) {
  const [activeImage, setActiveImage] = useState(0);
  const { addToWishlist, removeFromWishlist, user } = useAuthState();
  const isOnWishlist = user.wishlist.productIds.some((id) => id == productId);

  return (
    <div className="product-gallery">
      <div className="product-gallery__container">
        <div className="product-gallery__images">
          <ul>
            {images.map((url, i) => (
              <li key={url}>
                <button
                  className={
                    i == activeImage ? "product-gallery__thumb-active" : ""
                  }
                  onClick={() => setActiveImage(i)}
                >
                  <Image
                    objectFit="contain"
                    src={url}
                    width={80}
                    height={60}
                    layout="responsive"
                    alt=""
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-gallery__picture">
          <div className="product-gallery__picture-container">
            <Carousel
              onUpdate={(i: number) => setActiveImage(i)}
              aIndex={activeImage}
            >
              {images.map((url, i) => (
                <FutureImage
                  key={"image:" + url}
                  style={{
                    objectPosition: "top",
                    objectFit: "contain",
                    maxHeight: "100%",
                    height: "100%",
                    position: "static",
                  }}
                  src={url}
                  width={dimensions[i].width}
                  height={dimensions[i].height}
                  alt=""
                />
              ))}
            </Carousel>
          </div>
          <button
            onClick={() =>
              isOnWishlist
                ? removeFromWishlist(productId)
                : addToWishlist(productId)
            }
            className="product-gallery__wish"
          >
            {isOnWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}

interface PropTypes {
  productId: string;
  images: string[];
  dimensions: { width: number; height: number }[];
}
