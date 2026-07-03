import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { PrimaryButton } from "../components/Buttons";

export function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page has left the table."
        subtitle="The page you're looking for doesn't exist or has moved."
      />
      <Section bg="gray">
        <div className="flex justify-center">
          <PrimaryButton to="/">Back to Home</PrimaryButton>
        </div>
      </Section>
    </>
  );
}
