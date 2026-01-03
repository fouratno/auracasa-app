import Script from "next/script";

export default function LinkConverterPlacement({
  placement,
}: {
  placement: string;
}) {
  return (
    <Script id={`tdlc-epi2-${placement}`} strategy="beforeInteractive">
      {`(function(){window.tdlc_epi2=${JSON.stringify(
        placement,
      )};document.documentElement.dataset.tdlcEpi2=${JSON.stringify(
        placement,
      )};})();`}
    </Script>
  );
}
