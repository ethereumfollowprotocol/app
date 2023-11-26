'use client'

import { useReportWebVitals } from 'next/web-vitals'

const REPORT_WEB_VITALS = process.env.NEXT_PUBLIC_REPORT_WEB_VITALS === 'true'

export default function WebVitals() {
  if (!REPORT_WEB_VITALS) return null

  useReportWebVitals(metric => {
    console.info(metric)
  })

  return null
}
