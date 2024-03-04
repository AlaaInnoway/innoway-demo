import { LinkHref } from "@component/ui/Link";
import { retrieveYear } from "@util/formatDate";

export default function FormFooter() {
  const currentYear = retrieveYear(new Date());
  return (
    <div className="flex items-center justify-center space-x-1">
      <h2 className="text-center text-sm text-gray-500">Copyright ©</h2>
      <LinkHref customClass="text-sm" url="http://www.innoway-solutions.com">
        Innoway
      </LinkHref>
      <h2 className="text-center text-sm text-gray-500">{currentYear}</h2>
    </div>
  );
}
