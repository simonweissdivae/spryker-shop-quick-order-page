<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace SprykerShop\Yves\QuickOrderPage;

use Spryker\Yves\Kernel\AbstractBundleConfig;

class QuickOrderPageConfig extends AbstractBundleConfig
{
    protected const TEXT_ORDER_ROW_SPLITTER_PATTERN = '/\r\n|\r|\n/';
    protected const TEXT_ORDER_SEPARATORS = [',', ';', ' '];
    protected const UPLOAD_ROW_COUNT_LIMIT = 1000;
    protected const DEFAULT_DISPLAYED_ROW_COUNT = 8;

    /**
     * @return string
     */
    public function getTextOrderRowSplitterPattern(): string
    {
        return static::TEXT_ORDER_ROW_SPLITTER_PATTERN;
    }

    /**
     * @return string[]
     */
    public function getTextOrderSeparators(): array
    {
        return static::TEXT_ORDER_SEPARATORS;
    }

    /**
     * @return int
     */
    public function getDefaultDisplayedRowCount(): int
    {
        return static::DEFAULT_DISPLAYED_ROW_COUNT;
    }

    /**
     * @return int
     */
    public function getUploadRowCountLimit(): int
    {
        return static::UPLOAD_ROW_COUNT_LIMIT;
    }
}
