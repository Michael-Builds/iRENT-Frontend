import { CiSearch } from "react-icons/ci"
import { useMainState } from "./context/StateContext"
import { CustomSelect } from "./inputs/Select"
import { useEffect } from "react"

export const SearchFilter = () => {
  const { openModal } = useMainState()

  return (
    <div
      onClick={() => {
        openModal("SEARCH")
      }}
      className="max-sm:border max-sm:hover:shadow-none max-sm:w-[12rem] max-sm:shadow-none w-[28rem] text-md h-[2.6rem] justify-between rounded-full shadow-sm border border-gray-200 flex items-center p-2 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <span className="ml-5 max-sm:hidden text-gray-500 flex-1 text-center border-r border-gray-300 ">
        Price
      </span>
      <span className="ml-5 max-sm:hidden text-gray-500 flex-1 text-center border-r border-gray-300">
        Location
      </span>
      <span className="ml-5 max-sm:hidden text-gray-500 flex-1 text-center ">
        Category
      </span>
      <span className="ml-5 max-sm:block hidden text-gray-500 flex-1 text-center ">
        Search
      </span>
      <div className="bg-[#d2710a] flex p-1.5 items-center justify-center rounded-full">
        <CiSearch size={20} className="text-white " />
      </div>
    </div>
  )
}

export const SearchModalContent = () => {
  const {
    step,
    setStep,
    selectedPrice,
    setSelectedPrice,
    selectedLocation,
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
  } = useMainState()

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handlePriceChange = (option) => {
    setSelectedPrice(option)
  }

  const handleLocationChange = (option) => {
    setSelectedLocation(option)
  }

  const handleCategoryChange = (option) => {
    setSelectedCategory(option)
  }

  const priceOptions = [
    { value: "0-100", label: "₵0 - ₵100" },
    { value: "100-500", label: "₵100 - ₵500" },
    { value: "500-1000", label: "₵500 - ₵1000" },
    { value: "1000-2000", label: "₵1000 - ₵2000" },
    { value: "2000+", label: "₵2000+" },
  ]

  const locationOptions = [
    { value: "accra", label: "Accra" },
    { value: "kumasi", label: "Kumasi" },
    { value: "takoradi", label: "Takoradi" },
    { value: "tamale", label: "Tamale" },
    { value: "cape-coast", label: "Cape Coast" },
  ]

  const categoryOptions = [
    { value: "single-room-self-contain", label: "Single Room Self Contain" },
    {
      value: "chamber-hall-self-contain",
      label: "Chamber and Hall Self Contain",
    },
    { value: "two-bedroom-self-contain", label: "Two Bedroom Self Contain" },
    { value: "single-room-porch", label: "Single Room with Porch" },
  ]

  const handleSubmit = async () => { }

  useEffect(() => {
    setStep(0);
  }, [setStep]);


  return (
    <div>
      {step === 0 && (
        <div>
          {/* Price content */}
          <div className="mb-4 mt-8">
            <label className="block text-gray-700 mb-2">Price</label>
            <CustomSelect
              options={priceOptions}
              placeholder="Select price range"
              value={selectedPrice}
              onChange={handlePriceChange}
            />
          </div>
          <button
            onClick={handleNext}
            className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          {/* Location content */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <CustomSelect
              options={locationOptions}
              placeholder="Select location"
              value={selectedLocation}
              onChange={handleLocationChange}
            />
          </div>
          <div className="flex justify-between gap-8">
            <button
              onClick={handleBack}
              className="bg-gray-300 hover:bg-gray-400 w-full text-gray-800 py-2 px-4 rounded-full mt-2 transition-all duration-300 ease-in-out"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          {/* Category content */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <CustomSelect
              options={categoryOptions}
              placeholder="Select category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="flex justify-between gap-8">
            <button
              onClick={handleBack}
              className="bg-gray-300 hover:bg-gray-400 w-full text-gray-800 py-2 px-4 rounded-full mt-2 transition-all duration-300 ease-in-out"
            >
              Back
            </button>

            <button
              onClick={handleSubmit}
              className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
