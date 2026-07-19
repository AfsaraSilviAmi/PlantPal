"use client";

import { useState } from "react";
import {
  Button,
  Select,
  Label,
  ListBox,
} from "@heroui/react";
import { motion } from "framer-motion";


type PreferenceKey =
  | "experience"
  | "sunlight"
  | "location"
  | "category";


type Recommendation = {
  plantName: string;
  match: string;
  reason: string;
};


type CustomSelectProps = {
  label: string;
  name: PreferenceKey;
  options: string[];
  value: string;
  onChange: (
    name: PreferenceKey,
    value: string
  ) => void;
};



// KEEP THIS OUTSIDE THE PAGE COMPONENT
function CustomSelect({
  label,
  name,
  options,
  value,
  onChange,
}: CustomSelectProps) {


  return (
    <Select

      selectedKey={value}

      onSelectionChange={(key)=>{

        onChange(
          name,
          String(key)
        );

      }}

    >

      <Label className="font-semibold text-primary-dark">
        {label}
      </Label>


      <Select.Trigger
        className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        "
      >

        <Select.Value />

        <Select.Indicator />

      </Select.Trigger>



      <Select.Popover>

        <ListBox>


          {
            options.map((option)=>(

              <ListBox.Item

                key={option}

                id={option}

                textValue={option}

              >

                {option}

                <ListBox.ItemIndicator />

              </ListBox.Item>

            ))
          }


        </ListBox>

      </Select.Popover>


    </Select>
  );
}







export default function RecommendationPage() {


  const [preferences,setPreferences] = useState({
    experience:"",
    sunlight:"",
    location:"",
    category:"",
  });



  const [results,setResults] = useState<Recommendation[]>([]);


  const [loading,setLoading] = useState(false);




  const updatePreference = (
    key:PreferenceKey,
    value:string
  )=>{

    setPreferences(prev=>({

      ...prev,

      [key]:value

    }));

  };





  const getRecommendations = async()=>{


    try{


      setLoading(true);



      const res = await fetch(

        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recommendations`,

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },

          body:JSON.stringify(preferences)

        }

      );



      const data = await res.json();


      setResults(data);



    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }


  };






  return (

    <main className="bg-[#F9F6EE] min-h-screen py-20">


      <div className="max-w-5xl mx-auto px-6">



        <h1 className="
        text-4xl
        md:text-5xl
        font-black
        text-center
        text-primary-dark
        ">

          Find Your Perfect Plant 🌱

        </h1>



        <p className="
        text-center
        text-gray-600
        mt-5
        ">

          Let PlantPal AI recommend plants based on your lifestyle.

        </p>





        <div className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        mt-12
        ">


          <div className="
          grid
          md:grid-cols-2
          gap-8
          ">




            <CustomSelect

              label="Experience"

              name="experience"

              value={preferences.experience}

              onChange={updatePreference}

              options={[
                "Beginner",
                "Intermediate",
                "Expert"
              ]}

            />





            <CustomSelect

              label="Sunlight"

              name="sunlight"

              value={preferences.sunlight}

              onChange={updatePreference}

              options={[
                "Low",
                "Medium",
                "Bright"
              ]}

            />






            <CustomSelect

              label="Location"

              name="location"

              value={preferences.location}

              onChange={updatePreference}

              options={[
                "Bedroom",
                "Balcony",
                "Garden"
              ]}

            />







            <CustomSelect

              label="Category"

              name="category"

              value={preferences.category}

              onChange={updatePreference}

              options={[
                "Indoor",
                "Outdoor",
                "Flowering",
                "Succulent",
                "Herb",
                "Vegetable"
              ]}

            />



          </div>






          <Button

            onPress={getRecommendations}

            className="
            mt-10
            bg-primary-green
            text-white
            rounded-full
            px-10
            "

          >

            {
              loading
              ?
              "Finding Plants..."
              :
              "Get AI Recommendations Below 🌱"
            }


          </Button>



        </div>






        <div className="
        mt-16
        grid
        md:grid-cols-2
        gap-6
        ">


          {
            results.map((plant,index)=>(


              <motion.div

                key={index}

                initial={{
                  opacity:0,
                  y:30
                }}

                whileInView={{
                  opacity:1,
                  y:0
                }}

                viewport={{
                  once:true
                }}

                className="
                bg-white
                rounded-3xl
                p-8
                shadow-lg
                "

              >


                <h2 className="
                text-2xl
                font-bold
                text-primary-dark
                ">

                  {plant.plantName}

                </h2>



                <p className="
                mt-3
                font-bold
                text-primary-green
                ">

                  Match: {plant.match}

                </p>



                <p className="
                mt-4
                text-gray-600
                leading-7
                ">

                  {plant.reason}

                </p>


              </motion.div>


            ))
          }


        </div>



      </div>


    </main>

  );

}