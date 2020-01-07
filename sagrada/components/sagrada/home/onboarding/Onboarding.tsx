import React from "react";

import {OnboardingCard} from "./OnboardingCard";

export type OnboardingProps = {
  className?: string;
};

export function Onboarding({className}: OnboardingProps): React.ReactElement {
  return (
    <section className={className}>
      <h2 className="text-3xl lg:text-4xl font-display text-center font-semibold mb-6 text-dark-gray-4">Dịch vụ cung cấp bởi VSJ</h2>
      <div className="flex flex-wrap -mx-4">
        <OnboardingCard
          className="lg:w-1/3 w-full"
          image="/onboarding/design.svg"
          title="Thiết kế và thẩm tra"
          description="Đội ngũ kỹ sư, kiến trúc sư giàu kinh nghiệm sẽ giúp công trình của bạn trở nên hoàn hảo nhất"
        />
        <OnboardingCard
          className="lg:w-1/3 w-full"
          image="/onboarding/cost-management.svg"
          title="Quản lý chi phí"
          description="Giải pháp quản lý chi phí tối ưu và sát với thực tế nhất cho dự án của bạn"
        />
        <OnboardingCard
          className="lg:w-1/3 w-full"
          image="/onboarding/monitor.svg"
          title="Giám sát thi công"
          description="Đảm bảo cho công trình thi công theo sát thiết kế và đúng tiến độ"
        />
        <OnboardingCard
          className="lg:w-1/2 w-full"
          image="/onboarding/planning.svg"
          title="Khảo sát xây dựng"
          description="Cung cấp báo cáo chính xác về điều kiện xây dựng của công trình"
        />
        <OnboardingCard
          className="lg:w-1/2 w-full"
          image="/onboarding/structuring.svg"
          title="Lập quy hoạch xây dựng"
          description="Đưa ra quy hoạch hoàn hảo cho dự án của bạn"
        />
      </div>
    </section>
  );
}
