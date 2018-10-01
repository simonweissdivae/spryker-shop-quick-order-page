<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace SprykerShop\Yves\QuickOrderPage\Form;

use Generated\Shared\Transfer\QuickOrderItemTransfer;
use Spryker\Yves\Kernel\Form\AbstractType;
use SprykerShop\Yves\QuickOrderPage\Form\Constraint\QtyFieldConstraint;
use SprykerShop\Yves\QuickOrderPage\Form\Constraint\QuantityRestrictionsConstraint;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @method \SprykerShop\Yves\QuickOrderPage\QuickOrderPageFactory getFactory()
 */
class OrderItemEmbeddedForm extends AbstractType
{
    public const FIELD_SKU = 'sku';
    public const FIELD_SKU_LABEL = 'quick-order.input-label.sku';
    public const FIELD_QTY = 'qty';
    public const FIELD_QTY_LABEL = 'quick-order.input-label.qty';
    public const FIELD_ID_PRODUCT_CONCRETE = 'id_product_concrete';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this
            ->addSku($builder)
            ->addQty($builder)
            ->addIdProductConcrete($builder);
    }

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => QuickOrderItemTransfer::class,
            'constraints' => [
                new QtyFieldConstraint(),
                new QuantityRestrictionsConstraint($this->getFactory()->getQuickOrderClient()),
            ],
        ]);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addSku(FormBuilderInterface $builder): FormTypeInterface
    {
        $builder
            ->add(static::FIELD_SKU, HiddenType::class, [
                'required' => false,
                'label' => false,
            ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addQty(FormBuilderInterface $builder): FormTypeInterface
    {
        $builder->add(static::FIELD_QTY, IntegerType::class, [
            'required' => false,
            'label' => false,
            'attr' => ['min' => 1],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addIdProductConcrete(FormBuilderInterface $builder): FormTypeInterface
    {
        $builder->add(static::FIELD_ID_PRODUCT_CONCRETE, HiddenType::class, [
            'required' => false,
        ]);

        return $this;
    }
}
