import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

function Signin() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
          <Quote
            text="The customer support I recieved was exceptional. The support team went above and beyond to address my concerns."
            author="Jules Winnfield"
            designation="CEO, Acme Inc"
          />
        </div>
      </div>
    </>
  );
}
export default Signin;
