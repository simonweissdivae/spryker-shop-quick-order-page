<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace SprykerShop\Yves\QuickOrderPage\Dependency\Client;

use Generated\Shared\Transfer\ProductQuantityTransfer;
use Generated\Shared\Transfer\ProductQuantityValidationResponseTransfer;

interface QuickOrderPageToProductQuantityClientInterface
{
    /**
     * @api
     *
     * @param int $quantity
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductQuantityValidationResponseTransfer
     */
    public function validateProductQuantityRestrictions(int $quantity, ProductQuantityTransfer $productQuantityTransfer): ProductQuantityValidationResponseTransfer;
}
