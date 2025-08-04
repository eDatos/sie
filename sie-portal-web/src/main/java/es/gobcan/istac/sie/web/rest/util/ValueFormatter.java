package es.gobcan.istac.sie.web.rest.util;

import java.text.NumberFormat;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.i18n.LocaleContextHolder;

public class ValueFormatter {

    private static final Logger log = LoggerFactory.getLogger(ValueFormatter.class);
    private final NumberFormat intFormatter;
    private final NumberFormat floatFormatter;

    public ValueFormatter() {
        intFormatter = getIntFormatter();
        floatFormatter = getFloatFormatter();
    }

    public String format(NumberFormat formatter, String value) {
        String str = value != null ? value : "";
        if (!str.isEmpty()) {
            double num = Double.parseDouble(str);
            return formatter.format(num);
        } else {
            return "";
        }
    }

    public String format(NumberFormat formatter, Number num) {
        return formatter.format(num);
    }

    public String formatInt(String value) {
        return format(intFormatter, value);
    }

    public String formatFloat(String value) {
        return format(floatFormatter, value);
    }

    public String formatInt(Integer value) {
        return format(intFormatter, value);
    }

    public String formatFloat(Float value) {
        return format(floatFormatter, value);
    }

    public String formatFloat(Double value) {
        return format(floatFormatter, value);
    }

    private String getLanguage() {
        Locale locale = LocaleContextHolder.getLocale();
        return locale.toString().split("_")[0];
    }

    private NumberFormat getIntFormatter() {
        return NumberFormat.getNumberInstance(new Locale(getLanguage()));
    }

    private NumberFormat getFloatFormatter() {
        NumberFormat floatFormatter = NumberFormat.getNumberInstance(new Locale(getLanguage()));
        floatFormatter.setMinimumFractionDigits(2);
        floatFormatter.setMaximumFractionDigits(2);
        return floatFormatter;
    }
}
