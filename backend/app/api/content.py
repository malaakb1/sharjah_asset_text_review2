from fastapi import APIRouter
from app.api.schemas import (
    AboutResponse,
    AboutCard,
    BilingualText,
    StepsResponse,
    StepItem,
)

router = APIRouter(tags=["content"])


@router.get("/content/about", response_model=AboutResponse)
async def get_about():
    """Return 'About the Award' section content."""
    return AboutResponse(
        section_title=BilingualText(ar="عن الجائزة", en="About the Award"),
        cards=[
            AboutCard(
                key="mission",
                title=BilingualText(ar="الرسالة", en="Mission"),
                text=BilingualText(
                    ar="تعزيز ثقافة التميز والإبداع والابتكار في الشارقة لإدارة الأصول من خلال تحفيز الأداء المتميز والممارسات الرائدة.",
                    en="Promoting a culture of excellence, creativity, and innovation at Sharjah Asset Management by incentivizing outstanding performance and leading practices.",
                ),
            ),
            AboutCard(
                key="vision",
                title=BilingualText(ar="الرؤية", en="Vision"),
                text=BilingualText(
                    ar="أن تكون جائزة سام نجوم للتميز المرجعية الأولى في تقييم ومكافأة التميز المؤسسي على مستوى الإمارة.",
                    en="To position the SAM Stars Excellence Award as the premier benchmark for evaluating and rewarding institutional excellence across the emirate.",
                ),
            ),
            AboutCard(
                key="values",
                title=BilingualText(ar="القيم", en="Values"),
                text=BilingualText(
                    ar="الشفافية، العدالة، الابتكار، التميز، الاستدامة.",
                    en="Transparency, Fairness, Innovation, Excellence, Sustainability.",
                ),
            ),
        ],
    )


@router.get("/content/steps", response_model=StepsResponse)
async def get_steps():
    """Return the 6 application steps."""
    return StepsResponse(
        section_title=BilingualText(ar="خطوات التقديم", en="How to Apply"),
        steps=[
            StepItem(
                number=1,
                title=BilingualText(ar="الاختيار", en="Select"),
                description=BilingualText(
                    ar="اختر الفئة المناسبة لتقديم طلبك.",
                    en="Choose the appropriate category for your application.",
                ),
            ),
            StepItem(
                number=2,
                title=BilingualText(ar="الفهم", en="Understand"),
                description=BilingualText(
                    ar="تعرّف على معايير التقييم والأوزان الخاصة بالفئة.",
                    en="Learn about the evaluation criteria and weights for your category.",
                ),
            ),
            StepItem(
                number=3,
                title=BilingualText(ar="التجهيز", en="Prepare"),
                description=BilingualText(
                    ar="جهّز المستندات والأدلة المطلوبة.",
                    en="Gather the required documents and evidence.",
                ),
            ),
            StepItem(
                number=4,
                title=BilingualText(ar="التجميع", en="Compile"),
                description=BilingualText(
                    ar="اجمع جميع المعلومات في نموذج التقديم.",
                    en="Compile all information into the application form.",
                ),
            ),
            StepItem(
                number=5,
                title=BilingualText(ar="المراجعة", en="Review"),
                description=BilingualText(
                    ar="راجع طلبك بعناية قبل الإرسال.",
                    en="Carefully review your application before submission.",
                ),
            ),
            StepItem(
                number=6,
                title=BilingualText(ar="التقديم", en="Submit"),
                description=BilingualText(
                    ar="أرسل طلبك وتابع حالته عبر البوابة.",
                    en="Submit your application and track its status through the portal.",
                ),
            ),
        ],
    )
