import { Suspense } from "react";

import RequirementDetails from "@/components/details";

const RequirementDetailsPage: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RequirementDetails />
      </Suspense>
    </div>
  );
};

export default RequirementDetailsPage;
