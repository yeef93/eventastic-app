import TwoContent from "@/components/TwoContent";
import Accordion from "@/components/Accordion";
import faqdata from "@/utils/faq";

function Faq() {
  return (
    <div className="w-full py-14">
      <TwoContent title="Frequently Asked Questions">
        <div className="mx-auto grid max-w-xl divide-y divide-neutral-200">
          {faqdata.map((item) => {
            return (
              <Accordion
                key={item.id}
                answer={item.question}
                question={item.answer}
              />
            );
          })}
        </div>
      </TwoContent>
    </div>
  );
}

export default Faq;
