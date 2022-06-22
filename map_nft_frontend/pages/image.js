import { useMoralis } from "react-moralis"
import { Tab } from "@headlessui/react"
import UploadImageCounty from "../components/county/UploadImageCounty"
import Header from "../components/Header"
import UploadImageState from "../components/UploadImageState"

export default function ImagePage() {
  const { isWeb3Enabled, account } = useMoralis()
  return (
    <div>
      <Header />
      {isWeb3Enabled && account ? (
        <>
          <Tab.Group>
            <Tab.List className="flex justify-center gap-x-4 p-2">
              <Tab
                className={({ selected }) =>
                  `rounded-md px-4 py-2 mx-2 ${
                    selected ? "bg-blue-500 text-white shadow-lg" : "text-black"
                  }`
                }
              >
                County
              </Tab>
              <Tab
                className={({ selected }) =>
                  `rounded-md px-4 py-2 mx-2 ${
                    selected ? "bg-teal-500 text-white shadow-lg" : "text-black"
                  }`
                }
              >
                State
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <p className="font-bold text-xl my-4 text-center">
                  Add/change county image
                </p>
                <UploadImageCounty />
              </Tab.Panel>
              <Tab.Panel>
                <p className="font-bold text-xl my-4 text-center">
                  Add/change state image
                </p>
                <UploadImageState />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      ) : (
        <p className="text-2xl my-2 font-bold text-center">
          Please connect Metamask!
        </p>
      )}
    </div>
  )
}
