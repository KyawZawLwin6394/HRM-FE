import { Accordion, AccordionItem } from "@nextui-org/react"
export default function Sidebar() {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const itemClasses = {
        base: " px-1 w-full",
        title: "font-normal text-medium",
        trigger: "data-[hover=true]:bg-default-100 round",
        indicator: "text-medium px-1 py-1",
        content: "text-small px-2 text-left",
    };
    return (

        <>
            <div className="w-1/6 grid grid-cols-1 grid-flow-col">
                <div className="nav-bar flex-grow">
                    <div className="border border-gray-400 rounded shadow">
                        <Accordion isCompact={true} variant="splited" itemClasses={itemClasses}>
                            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                                {defaultContent}
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                                {defaultContent}
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                                {defaultContent}
                            </AccordionItem>
                        </Accordion>
                    </div>

                </div>
            </div>

        </>

    )
}