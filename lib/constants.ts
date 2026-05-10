import {Bed, Sofa } from "lucide-react";




export const categories = [

  {
    title: "Bedroom",
    Catslug: "bedroom",
    img: "/bedroom.jpg",
    subCategories: [
      { title: "Bed Sets", slug: "bed-sets" },
      { title: "Side Table", slug: "side-table" },
    ],
  },
  {
    title: "Living Room",
    Catslug: "living-room",
    img: "/living.jpg",
    subCategories: [
      { title: "Sofa", slug: "sofa" },
      { title: "Chair", slug: "chair" },
      { title: "Coffee Table", slug: "coffee-table" },
    ],
  },
{
   title: "Dining Room",
    Catslug: "dining-room",
  
    subCategories: [
      { title: "Table", slug: "table" },
      { title: "Chair", slug: "chair" },
    ],
},

  {
    title: "Kids",
    Catslug: "kids",
    subCategories: [
         { title: "Bed", slug: "bed" },
      { title: "Study Desk", slug: "study-desk" },
      { title: "Chair", slug: "chair" },
      { title: "Toy Storage", slug: "toy-storage"},
    ],
  },
];

export const furnitureca = [
    {
        id: 1,
        title: "sofa",
        slug: "/products/living-room/sofa",
        icon: Sofa,
    },
    {
  id: 2,
        title: "bed",
        slug: "/products/bedroom/bed-sets",
        icon: Bed,
    },
    {
        id: 3,
        title: "Chair",
        slug: "/products/living-room/chair",
              img: "/chair.png",

    },
     {
        id: 4,
        title: "table",
        slug: "/products/dining-room/table",
        img: "/table.png",
    },
    {
      id: 5,
      title: "Side table",
       slug: "/products/bedroom/side-table",
       img: "/side-table-icon.png" 
    }
]



export const rooms = [
  {
    id: 1,
    title: "Bed Room",
    slug: "bedroom",
    img: "/Bed.jpg"
  },
    {
    id: 2,
    title: "Living Room",
    slug: "living-room",
    img: "/living.jpg"
  },
  {
    id: 3,
    title: "Dining Room",
    slug: "dining-room",
    img: "/dining.jpg"
  },
  {
    id: 4,
    title: "Kids room",
    slug: "kids",
    img: "/kids.jpg"
  }
]